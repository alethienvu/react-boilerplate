import { MobileDatePicker, MobileDateTimePicker, MobileTimePicker } from '@mui/lab';
import { TextFieldProps, TextField } from '@mui/material';
import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface Props {
  label: string;
  name: string;
  control: Control | any;
  isError: boolean;
  variant?: TextFieldProps['variant'];
  errorMessage?: string;
  fullWidth?: boolean;
  size?: TextFieldProps['size'];
  type?: 'date' | 'time' | 'datetime';
}

const DateInput: React.FC<Props> = ({
  label,
  name,
  control,
  isError,
  errorMessage,
  variant = 'outlined',
  fullWidth = true,
  size = 'medium',
  type = 'datetime',
  ...rest
}) => {
  const { t } = useTranslation();

  return (
    <Controller
      render={({ field }) => {
        if (type === 'datetime') {
          return (
            <MobileDateTimePicker
              label={t(label)}
              onChange={field.onChange}
              value={field.value}
              inputFormat='yyyy-MM-dd HH:mm:ss'
              renderInput={(params) => {
                return (
                  <TextField
                    size={size}
                    margin='normal'
                    fullWidth={fullWidth}
                    variant={variant}
                    autoComplete='off'
                    style={{ marginTop: 0 }}
                    error={isError}
                    helperText={Boolean(errorMessage) && t(errorMessage!)}
                    {...params}
                    {...field}
                  />
                );
              }}
            />
          );
        }

        if (type === 'time') {
          return (
            <MobileTimePicker
              label={t(label)}
              onChange={field.onChange}
              value={field.value}
              inputFormat='HH:mm:ss'
              renderInput={(params) => (
                <TextField
                  size={size}
                  margin='normal'
                  fullWidth={fullWidth}
                  variant={variant}
                  autoComplete='off'
                  style={{ marginTop: 0 }}
                  error={isError}
                  helperText={Boolean(errorMessage) && t(errorMessage!)}
                  {...params}
                  {...field}
                />
              )}
            />
          );
        }

        return (
          <MobileDatePicker
            label={t(label)}
            onChange={field.onChange}
            value={field.value}
            inputFormat='yyyy-MM-dd'
            renderInput={(params) => (
              <TextField
                size={size}
                margin='normal'
                label={t(label)}
                fullWidth={fullWidth}
                variant={variant}
                autoComplete='off'
                style={{ marginTop: 0 }}
                error={isError}
                helperText={Boolean(errorMessage) && t(errorMessage!)}
                {...rest}
                {...params}
              />
            )}
          />
        );
      }}
      control={control}
      name={name}
    />
  );
};

export default DateInput;

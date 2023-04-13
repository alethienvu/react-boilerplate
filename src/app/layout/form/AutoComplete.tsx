import { Autocomplete, BaseTextFieldProps, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import Spinner from '../async/Spinner';

interface Props {
  name: string;
  control: Control;
  label: string;
  options: any[];
  labelField: string;
  loading: boolean;
  isError: boolean;
  errorMessage?: string;
  setTerm: React.Dispatch<React.SetStateAction<string>>;
  setOptions: React.Dispatch<React.SetStateAction<any[]>>;
  variant?: BaseTextFieldProps['variant'];
  size?: BaseTextFieldProps['size'];
}

const AutoComplete: React.FC<Props> = ({
  name,
  control,
  label,
  options,
  labelField,
  loading,
  isError,
  errorMessage,
  variant = 'outlined',
  size = 'small',
  setOptions,
  setTerm,
}) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open, setOptions]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <Autocomplete
            size={size}
            fullWidth
            disableClearable
            options={options}
            loading={loading}
            open={open}
            getOptionLabel={(opt: any) => {
              if (opt && opt[labelField]) {
                return opt[labelField];
              }

              return '';
            }}
            onInputChange={(e, value) => setTerm(value)}
            onChange={(e, data) => field.onChange(data)}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            renderInput={(params) => (
              <TextField
                error={isError}
                helperText={errorMessage}
                label={label}
                variant={variant}
                {...params}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {loading ? <Spinner /> : null}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ),
                }}
                {...field}
              />
            )}
          />
        );
      }}
    />
  );
};

export default AutoComplete;

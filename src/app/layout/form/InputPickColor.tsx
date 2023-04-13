import { TextFieldProps } from '@mui/material';
import ColorPicker from './ColorPicker';
import { Control, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface Props {
  control: Control | any;
  name: string;
  label?: string;
  type?: 'text' | 'password' | 'number';
  fullWidth?: boolean;
  variant?: TextFieldProps['variant'];
  size?: TextFieldProps['size'];
  isError: boolean;
  errorMessage?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const InputPickColor: React.FC<Props> = ({
  control,
  name,
  label,
  fullWidth = true,
  type = 'text',
  variant = 'outlined',
  size = 'medium',
  isError,
  errorMessage,
  startIcon,
  endIcon,
  ...rest
}) => {
  const { t } = useTranslation();
  return (
    <Controller
      render={({ field }) => (
        <ColorPicker
          variant={variant}
          fullWidth={fullWidth}
          label={label && t(label as string)}
          helperText={Boolean(errorMessage) && t(errorMessage!)}
          size={size}
          InputProps={{
            endAdornment: endIcon,
            startAdornment: startIcon,
          }}
          error={isError}
          {...field}
          {...rest}
        />
      )}
      control={control}
      name={name}
    />
  );
};

export default InputPickColor;

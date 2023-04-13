import { LoadingButton, LoadingButtonProps } from '@mui/lab';
import { Box, styled, useTheme } from '@mui/material';
import Spinner from '../async/Spinner';

interface SubmitButtonProps {}

interface LoadingFormProps {
  variant: 'modal' | 'drawer';
}

export const Form = styled('form')(() => ({
  width: '100%',
}));

export const FormItem = styled('div')(({ theme }) => ({
  width: '100%',
  marginBottom: theme.spacing(2),
}));

export const SubmitButton: React.FC<SubmitButtonProps & LoadingButtonProps> = ({
  children,
  type = 'submit',
  ...rest
}) => {
  return (
    <LoadingButton variant='contained' loadingIndicator='Loading...' fullWidth color='primary' type={type} {...rest}>
      {children}
    </LoadingButton>
  );
};

export const LoadingForm: React.FC<LoadingFormProps> = ({ variant }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: (theme) => {
          if (variant === 'modal') {
            return theme.zIndex.modal + 10;
          }

          return theme.zIndex.drawer + 10;
        },
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Spinner size={32} thickness={5} color={theme.palette.primary.dark} />
    </Box>
  );
};

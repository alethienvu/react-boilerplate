import { Box, Typography } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { TLoginArgs } from 'app/api/authAPI';
import { LanguageTranslate } from 'app/languages';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { LoginContainer } from './login-container';
import { loginValidator } from 'app/utils/validators';
import { useState } from 'react';
import useAuth from 'app/hooks/useAuth';

interface Props {}

export const LoginPage: React.FC<Props> = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);
  const { control, formState, handleSubmit } = useForm<TLoginArgs>({
    mode: 'onChange',
    defaultValues: { username: '', password: '' },
    resolver: yupResolver(loginValidator),
  });
  const { login } = useAuth();

  const submitForm = handleSubmit(async ({ username, password }) => {
    console.log({ username, password });

    setLoading(true);

    try {
      await login(username, password);
    } catch (err) {
      console.log({ err });
    } finally {
      setLoading(false);
    }
  });

  return (
    <Box
      sx={{
        width: '100%',
      }}
    >
      <Box
        sx={{
          maxWidth: 500,
          m: 'auto',
          px: 2,
          py: 4,
          mt: 10,
          boxShadow: (theme) => theme.shadows[3],
        }}
      >
        <Typography variant='h5' color='primary' sx={{ mb: 4 }} align='center'>
          {t(LanguageTranslate.form.login.title)}
        </Typography>
        <LoginContainer control={control} submitForm={submitForm} loading={loading} errors={formState.errors} />
      </Box>
    </Box>
  );
};

import { Box } from '@mui/material';
import { TLoginArgs } from 'app/api/authAPI';
import { LanguageTranslate } from 'app/languages';
import { Form, FormItem, SubmitButton } from 'app/layout/form/common-form';
import Input from 'app/layout/form/Input';
import { Control, FieldErrors } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface Props {
  control: Control<TLoginArgs>;
  loading: boolean;
  errors: FieldErrors<TLoginArgs>;
  submitForm: (event: React.FormEvent<HTMLFormElement>) => void;
}

export const LoginContainer: React.FC<Props> = ({ control, loading, errors, submitForm }) => {
  const { t } = useTranslation();

  return (
    <Box>
      <Form onSubmit={submitForm}>
        <FormItem>
          <Input
            control={control}
            name='email'
            label={LanguageTranslate.form.login.label_username}
            isError={Boolean(errors?.email)}
            errorMessage={errors?.email?.message}
          />
        </FormItem>
        <FormItem>
          <Input
            control={control}
            type='password'
            name='password'
            label={LanguageTranslate.form.login.label_password}
            isError={Boolean(errors?.password)}
            errorMessage={errors?.password?.message}
          />
        </FormItem>

        <SubmitButton loading={loading} size='large' type='submit'>
          {t(LanguageTranslate.form.login.title)}
        </SubmitButton>
      </Form>
    </Box>
  );
};

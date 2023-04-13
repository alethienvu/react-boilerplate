import { LoadingButtonProps } from '@mui/lab';
import { Box, Button, Stack, Typography } from '@mui/material';
import useUI from 'app/hooks/useUI';
import { LanguageTranslate } from 'app/languages';
import { useTranslation } from 'react-i18next';
import { SubmitButton } from './common-form';

interface DrawerFormActionsProps {
  loading: boolean;
  btnSize?: 'medium' | 'large';
}

export const DrawerFormHeader: React.FC = ({ children }) => {
  return (
    <Box sx={{ mb: 2, p: 2 }}>
      <Typography variant='h6'>{children}</Typography>
    </Box>
  );
};

export const DrawerFormActions: React.FC<DrawerFormActionsProps & LoadingButtonProps> = ({
  loading,
  btnSize,
  onClick,
}) => {
  const { t } = useTranslation();
  const { closeDrawer } = useUI();

  const handleCancel = () => {
    closeDrawer();
  };

  return (
    <Stack
      direction='row'
      justifyContent='space-between'
      sx={{
        width: '100%',
        p: 2,
      }}
    >
      <Box>
        <Button variant='contained' onClick={handleCancel} size={btnSize}>
          {t(LanguageTranslate.common.text_cancel)}
        </Button>
      </Box>
      <Box>
        <SubmitButton loading={loading} size={btnSize} type={onClick ? 'button' : 'submit'} onClick={onClick}>
          {t(LanguageTranslate.common.text_confirm)}
        </SubmitButton>
      </Box>
    </Stack>
  );
};

export const DrawerFormRow: React.FC = ({ children }) => {
  return (
    <Stack
      direction='row'
      sx={{
        width: '100%',
        px: 2,
        mb: 2,
      }}
      spacing={2}
    >
      {children}
    </Stack>
  );
};

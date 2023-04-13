import { Alert, Slide, Snackbar } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import useUI from 'app/hooks/useUI';
import { ALERT_CLOSE_TIMEOUT } from 'app/utils/constants';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function TransitionLeft(props: TransitionProps) {
  return <Slide {...props} direction='left' />;
}

const AlertManager: React.FC = () => {
  const { t } = useTranslation();
  const { alert, clearAlert } = useUI();

  useEffect(() => {
    if (alert && alert.open) {
      setTimeout(() => {
        handleClear();
      }, ALERT_CLOSE_TIMEOUT);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alert]);

  const handleClear = () => clearAlert();

  if (alert.open && alert.status !== null) {
    return (
      <Snackbar
        open={alert.open}
        autoHideDuration={3000}
        // onClose={handleClear}
        TransitionComponent={TransitionLeft}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert elevation={6} variant='filled' onClose={handleClear} severity={alert.status}>
          {t(alert.message)}
        </Alert>
      </Snackbar>
    );
  }

  return null;
};

export default AlertManager;

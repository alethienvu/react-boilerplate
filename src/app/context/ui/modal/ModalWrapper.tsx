import { CloseOutlined as CloseOutlinedIcon } from '@mui/icons-material';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton as MUIIconButton,
  Slide,
  styled,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { LoadingForm } from 'app/layout/form/common-form';
import { forwardRef, useContext } from 'react';
import { EModalType } from '../enum';
import ModalContext from '../index';

interface Props {
  modalType: EModalType;
  title: string;
  actions?: React.ReactElement;
  closeable: boolean;
  loading?: boolean;
}

const IconButton = styled(MUIIconButton)(({ theme }) => ({
  position: 'absolute',
  right: theme.spacing(1),
  top: theme.spacing(1),
  color: theme.palette.grey[500],
}));

const Transition = forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  return <Slide direction='down' ref={ref} {...props} />;
});

const ModalWrapper: React.FC<Props> = ({
  children,
  title,
  closeable,
  actions,
  modalType,
  loading = false,
  ...rest
}) => {
  const theme = useTheme();
  const { checkOpen, closeModal } = useContext(ModalContext);

  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));

  const status = checkOpen('modal', modalType);

  return (
    <Dialog
      open={status}
      maxWidth='sm'
      fullScreen={matchesXS}
      fullWidth
      TransitionComponent={Transition}
      onClose={closeModal}
      {...rest}
    >
      {loading && <LoadingForm variant='modal' />}
      <DialogTitle>
        {title}
        {closeable && (
          <IconButton onClick={() => closeModal()}>
            <CloseOutlinedIcon />
          </IconButton>
        )}
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
      {actions && <DialogActions>{actions}</DialogActions>}
    </Dialog>
  );
};

export default ModalWrapper;

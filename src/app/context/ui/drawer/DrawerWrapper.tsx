import { CloseOutlined as CloseOutlinedIcon } from '@mui/icons-material';
import { Box, Divider, IconButton, styled, SwipeableDrawer } from '@mui/material';
import useUI from 'app/hooks/useUI';
import { LoadingForm } from 'app/layout/form/common-form';
import { sidebarWidth } from 'configs/sidebar.config';
import { EDrawerType } from '../enum';

interface Props {
  drawerType: EDrawerType;
  drawerWidth?: number;
  fullScreen?: boolean;
  closeable?: boolean;
  header?: JSX.Element;
  loading?: boolean;
}

const DrawerHeader = styled('div')(({ theme }) => ({
  ...theme.mixins.toolbar,
  position: 'relative',
}));

const DrawerWrapper: React.FC<Props> = ({
  children,
  drawerWidth,
  drawerType,
  fullScreen = false,
  closeable = true,
  header,
  loading = false,
  ...rest
}) => {
  const { closeDrawer, checkOpen, drawer } = useUI();
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const status = checkOpen('drawer', drawerType);

  const handleClose = () => {
    closeDrawer();
  };

  const { position = 'left' } = drawer;

  return (
    <SwipeableDrawer
      disableBackdropTransition={!iOS}
      disableDiscovery={iOS}
      open={status}
      onClose={() => closeDrawer()}
      onOpen={() => {}}
      PaperProps={{
        sx: {
          minWidth: '15em',
          width: {
            xs: '100vw',
            md: fullScreen ? '100vw' : drawerWidth || sidebarWidth,
          },
        },
      }}
      anchor={position || 'left'}
      {...rest}
    >
      {loading && <LoadingForm variant='drawer' />}
      <DrawerHeader>
        {closeable && (
          <IconButton
            sx={{
              position: 'absolute',
              top: '50%',
              transform: 'translateY(-50%)',
              ...(position === 'left' && {
                right: 0,
              }),
              ...(position === 'right' && {
                left: 0,
              }),
            }}
            onClick={handleClose}
          >
            <CloseOutlinedIcon />
          </IconButton>
        )}
        {header}
      </DrawerHeader>
      <Divider />
      <Box sx={{ width: '100%' }}>{children}</Box>
    </SwipeableDrawer>
  );
};

export default DrawerWrapper;

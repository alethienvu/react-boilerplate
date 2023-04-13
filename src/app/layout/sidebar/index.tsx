import { Divider, Drawer } from '@mui/material';
import { sidebarWidth } from 'configs/sidebar.config';
import { lazy } from 'react';
import { HeaderPlaceHolder } from '../header-placeholder';

const SidebarList = lazy(() => import('./SidebarList'));
const SidebarDrawer = lazy(() => import('./SidebarDrawer'));
const SidebarLoading = lazy(() => import('./SidebarLoading'));

interface Props {
  open: boolean;
  loading: boolean;
}

export const Sidebar: React.FC<Props> = ({ open, loading }) => {
  return (
    <Drawer
      sx={{
        width: sidebarWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: sidebarWidth,
          boxSizing: 'border-box',
        },
      }}
      variant='persistent'
      anchor='left'
      open={open}
    >
      <HeaderPlaceHolder />
      <Divider />
      {loading ? <SidebarLoading /> : <SidebarList sidebarOpen={open} />}

      <SidebarDrawer loading={loading} />
    </Drawer>
  );
};

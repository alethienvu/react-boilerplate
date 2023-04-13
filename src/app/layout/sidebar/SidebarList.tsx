import { Divider, List, ListSubheader } from '@mui/material';
import useNavigation from 'app/hooks/useNavigation';
import useUI from 'app/hooks/useUI';
import { Fragment, lazy } from 'react';
import { useTranslation } from 'react-i18next';

const SidebarItem = lazy(() => import('./SidebarItem'));

interface Props {
  sidebarOpen: boolean;
}

const SidebarList: React.FC<Props> = ({ sidebarOpen }) => {
  const { t } = useTranslation();
  const { listDense } = useUI();
  const { menus } = useNavigation();

  return (
    <>
      {menus.map((menu) => (
        <Fragment key={`${menu.name}`}>
          <List
            dense={listDense}
            subheader={<ListSubheader disableSticky>{sidebarOpen ? t(menu.name) : <Divider />}</ListSubheader>}
          >
            {menu.sidebars.map((item) => {
              return <SidebarItem key={item.label} item={item} />;
            })}
          </List>
          <Divider />
        </Fragment>
      ))}
    </>
  );
};

export default SidebarList;

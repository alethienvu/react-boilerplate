import { Menu as MenuIcon } from '@mui/icons-material';
import {
  AppBar as MUIAppBar,
  AppBarProps as MUIAppBarProps,
  CssBaseline,
  IconButton,
  styled,
  Toolbar,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { EDrawerType, ESidebarExpandVariant } from 'app/context/ui/enum';
import useUI from 'app/hooks/useUI';
import { sidebarWidth } from 'configs/sidebar.config';
import queryString from 'query-string';
import { lazy } from 'react';
import { useHistory } from 'react-router-dom';

const CurrentAccountBadge = lazy(() => import('./CurrentAccountBadge'));

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

interface AppBarProps extends MUIAppBarProps {
  open?: boolean;
}

const AppBar = styled(MUIAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${sidebarWidth}px)`,
    marginLeft: `${sidebarWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export const Header: React.FC<Props> = ({ open, setOpen }) => {
  const theme = useTheme();
  const history = useHistory();
  const matchSM = useMediaQuery(theme.breakpoints.down('sm'));
  const { openDrawer, setSidebarExpandVariant } = useUI();
  const handleDrawerToggle = () => {
    if (!matchSM) {
      setOpen(!open);
    } else {
      openDrawer(EDrawerType.SIDEBAR_DRAWER, 'left');
    }

    let expandVariant: ESidebarExpandVariant;
    if (open) {
      expandVariant = ESidebarExpandVariant.EXPAND_LESS;
    } else {
      expandVariant = ESidebarExpandVariant.EXPAND_MORE;
    }
    const search = queryString.stringify({
      sidebarExpandVariant: expandVariant,
    });
    setSidebarExpandVariant(expandVariant);
    history.push({ search });
  };

  return (
    <>
      <CssBaseline />
      <AppBar position='fixed' color='default' open={open}>
        <Toolbar>
          <IconButton
            size='large'
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerToggle}
            edge='start'
            sx={{
              mr: 2,
            }}
          >
            <MenuIcon />
          </IconButton>

          <CurrentAccountBadge loading={false} />
        </Toolbar>
      </AppBar>
    </>
  );
};

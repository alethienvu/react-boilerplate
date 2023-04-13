import { ExpandLess, ExpandMore } from '@mui/icons-material';
import {
  Collapse,
  Divider,
  List,
  ListItem as MUIListItem,
  ListItemButton as MUIListItemButton,
  listItemClasses,
  ListItemIcon as MUIListItemIcon,
  listItemIconClasses,
  ListItemText,
  styled,
} from '@mui/material';
import useUI from 'app/hooks/useUI';
import { ISidebarItem } from 'app/types/sidebar';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

interface Props {
  item: ISidebarItem;
  borderBottom?: boolean;
}

interface ListItemIconProps {
  active: boolean;
}

const ListItem = styled(MUIListItem)(({ theme }) => {
  return {
    [`&.${listItemClasses.selected}`]: {
      backgroundColor: `${theme.palette.secondary.main} !important`,
      color: '#fff',
      boxShadow: 4,
      borderRadius: 4,
      '& .MuiListItemIcon-root': {
        color: '#fff',
      },
      '&:hover': {
        backgroundColor: `${theme.palette.secondary.dark} !important`,
      },
    },
  };
});

const ListItemButton = styled(MUIListItemButton)(({ theme }) => ({
  '&:hover': {
    backgroundColor: 'transparent',
  },
}));

const ListItemIcon = styled(MUIListItemIcon, {
  shouldForwardProp: (prop) => prop !== 'active',
})<ListItemIconProps>(({ theme, active }) => ({
  [`&.${listItemIconClasses.root}`]: active && {
    '& > svg': {
      color: '#fff !important',
    },
  },
}));

const SidebarItem: React.FC<Props> = ({ item, borderBottom }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const { listDense, sidebarExpandKey, sidebarActive, setSidebarExpandKey, setSidebarActive } = useUI();

  const renderLabelItem = (item: ISidebarItem): JSX.Element => {
    return <span>{t(item.label)}</span>;
  };

  const hasChild = useMemo(() => {
    return Boolean(item.child && item.child.length > 0);
  }, [item.child]);

  const handleItemClick = (item: ISidebarItem) => {
    const hasChild = item.child && item.child.length > 0;
    if (hasChild) {
      setSidebarExpandKey((prev) => {
        if (prev && prev === item.key) {
          return null;
        }
        return item.key;
      });
    } else {
      history.push(item.link);
      setSidebarActive(item);
      setSidebarExpandKey((prev) => {
        if (prev !== item.parentKey) {
          return null;
        }

        return prev;
      });
    }
  };

  const checkItemIsActive = (item: ISidebarItem, sbActive: ISidebarItem | null): boolean => {
    if (!sbActive) {
      return false;
    }

    return item.key === sbActive.key;
  };

  const expand = useMemo(() => {
    return sidebarExpandKey === item.key;
  }, [item.key, sidebarExpandKey]);

  const isItemActive = useMemo(() => {
    return checkItemIsActive(item, sidebarActive);
  }, [item, sidebarActive]);

  return (
    <>
      <ListItem
        onClick={() => {
          handleItemClick(item);
        }}
        selected={isItemActive}
      >
        <ListItemButton>
          {item.icon && <ListItemIcon active={isItemActive}>{item.icon}</ListItemIcon>}
          <ListItemText primary={renderLabelItem(item)} />
        </ListItemButton>
        {hasChild && <>{expand ? <ExpandLess /> : <ExpandMore />}</>}
      </ListItem>
      {hasChild && (
        <Collapse in={expand} timeout='auto' unmountOnExit>
          <List dense={listDense} component='div' disablePadding>
            {item.child!.map((it) => {
              const isItActive = checkItemIsActive(it, sidebarActive);
              return (
                <ListItem
                  key={it.label}
                  onClick={() => {
                    handleItemClick(it);
                  }}
                  selected={isItActive}
                  sx={{ pl: 4 }}
                >
                  <ListItemButton>
                    {it.icon && <ListItemIcon active={isItActive}>{it.icon}</ListItemIcon>}
                    <ListItemText primary={renderLabelItem(it)} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Collapse>
      )}
      {borderBottom && <Divider />}
    </>
  );
};

export default SidebarItem;

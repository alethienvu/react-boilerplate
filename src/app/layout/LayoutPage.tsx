import { Box, useMediaQuery, useTheme } from '@mui/material';
import { ESidebarExpandVariant } from 'app/context/ui/enum';
import useUI from 'app/hooks/useUI';
import { useEffect, useState } from 'react';
import { Header } from './header';
import { HeaderPlaceHolder } from './header-placeholder';
import { Main } from './main';
import { Sidebar } from './sidebar';

interface Props {}

export const LayoutPage: React.FC<Props> = ({ children }) => {
  const theme = useTheme();
  const { sidebarExpandVariant } = useUI();
  const matchMD = useMediaQuery(theme.breakpoints.down('md'));
  const [open, setOpen] = useState(() => {
    if (matchMD || sidebarExpandVariant === ESidebarExpandVariant.EXPAND_LESS) {
      return false;
    }

    return true;
  });

  useEffect(() => {
    if (matchMD) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [matchMD]);

  return (
    <Box sx={{ display: 'flex' }}>
      <Header open={open} setOpen={setOpen} />
      <Sidebar loading={false} open={open} />
      <Main open={open}>
        <HeaderPlaceHolder />
        {children}
      </Main>
    </Box>
  );
};

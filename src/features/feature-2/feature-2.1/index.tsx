import { Box, Button } from '@mui/material';
import { EDrawerType } from 'app/context/ui/enum';
import useUI from 'app/hooks/useUI';

const Feature2_1 = () => {
  const { openDrawer } = useUI();
  const handleOpenDrawer = () => {
    openDrawer(EDrawerType.SAMPLE_DRAWER, 'right');
  };
  return (
    <Box sx={{ width: '100%', p: 2 }}>
      <Button variant='contained' onClick={handleOpenDrawer}>
        Open Sample Drawer
      </Button>
    </Box>
  );
};

export default Feature2_1;

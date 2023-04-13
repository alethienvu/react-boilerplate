import { Box, Button } from '@mui/material';
import { EModalType } from 'app/context/ui/enum';
import useUI from 'app/hooks/useUI';

const Feature1 = () => {
  const { openModal } = useUI();
  const handleOpenModal = () => {
    openModal(EModalType.SAMPLE_MODAL);
  };
  return (
    <Box sx={{ width: '100%', p: 2 }}>
      <Button variant='contained' onClick={handleOpenModal}>
        Open Sample Modal
      </Button>
    </Box>
  );
};

export default Feature1;

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#B07740',
    boxShadow: 24,
    p: 4,
};

export default function CardModal({ open, handleClose }) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Découvrir
        </Typography>
        <Typography id="modal-modal-description" >
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </Typography>
        <Button onClick={handleClose} sx={{ color: '#462A1A', position: 'absolute', top: '10%', left: '80%' }}>X</Button>
      </Box>
    </Modal>
  );
}

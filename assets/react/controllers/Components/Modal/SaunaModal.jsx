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

const isDisabled = () => {
  const date = new Date()
  const year = date.getFullYear();
  const seasonStart = new Date(year, 9, 1);     // 1er octobre (mois = 9)
  const seasonEnd = new Date(year + 1, 4, 2);   // 2 mai de l'année suivante

  return date >= seasonStart || date < seasonEnd;
}

export default function SaunaModal({ open, handleClose, title }) {

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {title}
        </Typography>
        <Button
          component="a" 
          href="/reservation?saunaType=petit"
          onClick={handleClose}
          sx={{ color: '#462A1A' }}
        >
          Le petit sauna (4 personnes)
        </Button>
        <Button 
          component="a" 
          href="/reservation?saunaType=grand" 
          onClick={handleClose} 
          disabled={isDisabled()} 
          sx={{ color: '#462A1A' }}
        >
          Le grand sauna (10 personnes)
        </Button>
        <Button onClick={handleClose} sx={{ color: '#462A1A', position: 'absolute', top: '10%', left: '80%' }}>
          X
        </Button>
      </Box>
    </Modal>
  );
}



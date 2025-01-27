import React from 'react';
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

export default function ConditionsModal ({ open, onClose, onSubmit }) {
  return (
    <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
            <Typography id="modal-title" variant="h6" component="h2">
            En confirmant votre réservation, vous acceptez les conditions suivantes:
            </Typography>
            <Typography id="modal-description" sx={{ mt: 2 }}>
            - Toute modification doit être annoncée au moins 24 heures à l'avance.<br/>
            - En cas de non-présentation, le montant total de la réservation reste dû.
            </Typography>
            <Button onClick={onClose} variant="text" color="error" sx={{ mt: 3 }}>
            Annuler
            </Button>
            <Button onClick={onSubmit} variant="text" color="success" sx={{ mt: 3 }}>
            Je confirme ma réservation
            </Button>
        </Box>
    </Modal>
  );
};

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

export default function ContactModal({ open, handleClose, formData, }) {

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
        <Box sx={style}>
            <Typography id="modal-title" variant="h6" component="h2">
                Merci {formData.firstName} de votre message !
            </Typography>
            <Typography sx={{ mt: 2 }}>
                Vos coordonnées:<br />
                <strong>Téléphone:</strong> {formData.phone}<br />
                <strong>E-mail :</strong> {formData.email}<br />
                <strong>Message :</strong> {formData.message}<br />
            </Typography>
            <Button onClick={handleClose} variant="text" color="success" sx={{ mt: 3 }}>
                Fermer
            </Button>
        </Box>
    </Modal>
    );
}

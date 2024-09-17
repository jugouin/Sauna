import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { format, parseISO, isValid } from 'date-fns';
import { fr } from 'date-fns/locale';

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



export default function CardModal({ open, handleClose, reservation, }) {

    let formattedDate = 'Date invalide';
    let formattedTime = 'Heure invalide';

    if (reservation.date) {
        const date = parseISO(reservation.date);
        if (isValid(date)) {
            formattedDate = format(date, 'EEEE dd MMMM', { locale: fr });
            formattedTime = format(date, 'HH\'h\'mm', { locale: fr });
        }
    }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
        <Box sx={style}>
            <Typography id="modal-title" variant="h6" component="h2">
                Réservation Confirmée !
            </Typography>
            <Typography id="modal-description" sx={{ mt: 2 }}>
                Merci {reservation.name} {reservation.surname} pour votre réservation.
            </Typography>
            <Typography sx={{ mt: 2 }}>
                <strong>Date :</strong> {formattedDate}<br />
                <strong>Heure :</strong> {formattedTime}<br />
                <strong>Nombre de personnes :</strong> {reservation.personNb}<br />
                <strong>Téléphone:</strong> {reservation.phone}<br />
                <strong>Email :</strong> {reservation.email}<br />
            </Typography>
            <Button onClick={handleClose} variant="text" color="success" sx={{ mt: 3 }}>
                Fermer
            </Button>
        </Box>
    </Modal>
    );
}

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '-webkit-fill-available',
  bgcolor: '#B07740',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function AdminCalendarModal({ open, handleClose, reservations, dateTime }) {
  return (
    <div>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Réservations du {dateTime && format(dateTime, 'dd MMMM yyyy', { locale: fr })} à {dateTime && format(dateTime, 'HH:mm', { locale: fr })}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <TableContainer>
                    <Table sx={{ maxWidth: 'md'}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ p: 1, m: 2  }}>Nom</TableCell>
                                <TableCell sx={{ p: 1, m: 2  }} align="right">Nombre</TableCell>
                                <TableCell sx={{ p: 1, m: 2  }} align="right">Téléphone</TableCell>
                                <TableCell sx={{ p: 1, m: 2  }} align="right">Sauna</TableCell>
                                <TableCell sx={{ p: 1, m: 2  }} align="right">Remarque</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {reservations.map((reservation, index) => (
                            <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell sx={{ p: 1, m: 2  }} component="th" scope="row">
                                {reservation.name} {reservation.surname}
                            </TableCell>
                            <TableCell sx={{ p: 1, m: 2  }} align="right">{reservation.personNb}</TableCell>
                            <TableCell sx={{ p: 1, m: 2  }} align="right">{reservation.phone}</TableCell>
                            <TableCell sx={{ p: 1, m: 2  }} align="right">{reservation.saunaType}</TableCell>
                            <TableCell sx={{ p: 1, m: 2  }} align="right">{reservation.remarks}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Typography>
        <Button onClick={handleClose} variant="text" color="success" sx={{ mt: 3 }}>Fermer</Button>
        </Box>
        </Modal>
    </div>
  );
}

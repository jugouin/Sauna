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
import TextField from '@mui/material/TextField';
import { Select } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
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
    const [editingId, setEditingId] = React.useState(null);
    const [editedReservations, setEditedReservations] = React.useState({});

    const handleEdit = (reservationId) => {
        const reservationToEdit = reservations.find(r => r.id === reservationId);
        setEditedReservations({
            ...editedReservations,
            [reservationId]: { ...reservationToEdit }
        });
        setEditingId(reservationId);
    };

    const handleSave = async (reservationId) => {
        try {
            const reservationToSave = { ...editedReservations[reservationId] };
            
            if (reservationToSave.dateTime) {
                reservationToSave.dateTime = new Date(reservationToSave.dateTime).toISOString();
            }
    
            const response = await axios.post(`/reservation/${reservationId}/edit`, reservationToSave, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                }
            });
    
            if (response.data.message === 'Reservation updated successfully') {
                setEditingId(null);
                if (response.data.dateTime) {
                    setEditedReservations(prev => ({
                        ...prev,
                        [reservationId]: {
                            ...prev[reservationId],
                            dateTime: new Date(response.data.dateTime)
                        }
                    }));
                }
            }
            window.location = '/admin';
        } catch (error) {
            console.error("Erreur lors de la modification de la réservation:", error.response?.data?.details || error.message);
        }
    };

    const handleCancel = (reservationId) => {
        setEditingId(null);
        const { [reservationId]: _, ...rest } = editedReservations;
        setEditedReservations(rest);
    };

    const handleInputChange = (reservationId, field, value) => {
        setEditedReservations({
            ...editedReservations,
            [reservationId]: {
                ...editedReservations[reservationId],
                [field]: value
            }
        });
    };

    const handleDelete = async (reservationId) => {
        try {
            await axios.delete(`/reservation/${reservationId}`);
            window.location = '/admin';
        } catch (error) {
            console.error("Erreur lors de la suppression de la réservation:", error);
        }
    };
    
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
                                        <TableCell sx={{ p: 1, m: 2 }}>Nom</TableCell>
                                        <TableCell sx={{ p: 1, m: 2 }} align="right">Nb</TableCell>
                                        <TableCell sx={{ p: 1, m: 2 }} align="right">Téléphone</TableCell>
                                        <TableCell sx={{ p: 1, m: 2 }} align="right">Sauna</TableCell>
                                        <TableCell sx={{ p: 1, m: 2 }} align="right">Remarque</TableCell>
                                        <TableCell sx={{ p: 1, m: 2 }} align="right"></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {reservations.map((reservation, index) => {
                                        const isEditing = editingId === reservation.id;
                                        const editedReservation = editedReservations[reservation.id] || reservation;

                                        return (
                                            <TableRow
                                                key={index}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell sx={{ p: 1, m: 2 }} component="th" scope="row">
                                                    {isEditing ? (
                                                        <TextField
                                                            value={`${editedReservation.name} ${editedReservation.surname}`}
                                                            onChange={(e) => {
                                                                const [name, ...surnameArr] = e.target.value.split(' ');
                                                                const surname = surnameArr.join(' ');
                                                                handleInputChange(reservation.id, 'name', name);
                                                                handleInputChange(reservation.id, 'surname', surname);
                                                            }}
                                                        />
                                                    ) : (
                                                        `${reservation.name} ${reservation.surname}`
                                                    )}
                                                </TableCell>
                                                <TableCell sx={{ p: 1, m: 2 }} align="right">
                                                    {isEditing ? (
                                                        <TextField
                                                            type="number"
                                                            value={editedReservation.personNb}
                                                            onChange={(e) => handleInputChange(reservation.id, 'personNb', e.target.value)}
                                                        />
                                                    ) : (
                                                        reservation.personNb
                                                    )}
                                                </TableCell>
                                                <TableCell sx={{ p: 1, m: 2 }} align="right">
                                                    {isEditing ? (
                                                        <TextField
                                                            value={editedReservation.phone}
                                                            onChange={(e) => handleInputChange(reservation.id, 'phone', e.target.value)}
                                                        />
                                                    ) : (
                                                        reservation.phone
                                                    )}
                                                </TableCell>
                                                <TableCell sx={{ p: 1, m: 2 }} align="right">
                                                    {isEditing ? (
                                                        <Select
                                                            value={editedReservation.saunaType}
                                                            onChange={(e) => handleInputChange(reservation.id, 'saunaType', e.target.value)}
                                                        >
                                                            <MenuItem value="petit">petit</MenuItem>
                                                            <MenuItem value="grand">grand</MenuItem>
                                                        </Select>
                                                    ) : (
                                                        reservation.saunaType
                                                    )}
                                                </TableCell>
                                                <TableCell sx={{ p: 1, m: 2 }} align="right">
                                                    {isEditing ? (
                                                        <TextField
                                                            value={editedReservation.remarks}
                                                            onChange={(e) => handleInputChange(reservation.id, 'remarks', e.target.value)}
                                                        />
                                                    ) : (
                                                        reservation.remarks
                                                    )}
                                                </TableCell>
                                                <TableCell sx={{ p: 1, m: 2 }} align="right">
                                                    {isEditing ? (
                                                        <>
                                                            <span 
                                                                className="material-symbols-outlined" 
                                                                style={{ cursor: 'pointer', color: 'green' }}
                                                                onClick={() => handleSave(reservation.id)}
                                                                title="Sauvegarder les modifications"
                                                            >
                                                                check_small
                                                            </span>
                                                            <span 
                                                                className="material-symbols-outlined" 
                                                                style={{ cursor: 'pointer', color: 'red', marginLeft: '8px' }}
                                                                onClick={() => handleCancel(reservation.id)}
                                                                title="Annuler les modifications"
                                                            >
                                                                close
                                                            </span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <span 
                                                                className="material-symbols-outlined" 
                                                                style={{ cursor: 'pointer', color: 'orange' }}
                                                                onClick={() => handleEdit(reservation.id)}
                                                                title="Modifier la réservation"
                                                            >
                                                                edit
                                                            </span>
                                                            <span 
                                                                className="material-symbols-outlined" 
                                                                style={{ cursor: 'pointer', color: 'red', marginLeft: '8px' }}
                                                                onClick={() => handleDelete(reservation.id)}
                                                                title="Supprimer la réservation"
                                                            >
                                                                delete
                                                            </span>
                                                        </>
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
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
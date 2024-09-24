import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import './AdminCalendarDialog.css';

const AdminCalendarDialog = ({ isOpen, onClose, reservations, dateTime }) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    return (
        <Dialog 
            fullScreen={fullScreen}
            open={isOpen} 
            onOpenChange={onClose}
            aria-labelledby="responsive-dialog-title">
            <DialogTitle id="responsive-dialog-title">
                Réservations du {dateTime && format(dateTime, 'dd MMMM yyyy', { locale: fr })} à {dateTime && format(dateTime, 'HH:mm', { locale: fr })}
            </DialogTitle>
            <DialogContent>
                <table>
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Nombre de personnes</th>
                            <th>Téléphone</th>
                            <th>Type de sauna</th>
                            <th>Remarque</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservations.length > 0 ? (
                            reservations.map((reservation, index) => (
                                <tr key={index} className="reservation-details">
                                    <td>{reservation.name} {reservation.surname}</td>
                                    <td>{reservation.personNb}</td>
                                    <td>{reservation.phone}</td>
                                    <td>{reservation.saunaType}</td>
                                    <td>{reservation.remarks}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">Aucune réservation pour ce créneau.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} variant="text" color="success" sx={{ mt: 3 }}>Fermer</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AdminCalendarDialog;
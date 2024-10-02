import React, { useState } from "react";
import { format, startOfWeek, addWeeks, subWeeks, endOfWeek, eachDayOfInterval, eachHourOfInterval, setHours, isSameHour, parseISO, addHours } from 'date-fns';
import { fr } from 'date-fns/locale';
import AdminCalendarModal from "../../Modal/AdminCalendarModal";
import './AdminCalendar.css';

const AdminCalendar = ({ reservations }) => {
    const [currentWeek, setCurrentWeek] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [selectedReservations, setSelectedReservations] = useState([]);
    const [selectedDateTime, setSelectedDateTime] = useState(null);

    const weekStart = startOfWeek(currentWeek, { weekStartsOn: 1 });
    const weekEnd = endOfWeek(currentWeek, { weekStartsOn: 1 });

    const daysOfWeek = eachDayOfInterval({ start: weekStart, end: weekEnd });
    const hoursOfDay = eachHourOfInterval({ start: setHours(new Date(), 10), end: setHours(new Date(), 21) });

    const prevWeek = () => setCurrentWeek(subWeeks(currentWeek, 1));
    const nextWeek = () => setCurrentWeek(addWeeks(currentWeek, 1));

    const adjustTimeZone = (date) => {
        return addHours(date, -2);
    };

    const getReservationsForTimeSlot = (day, hour) => {
        const currentDateTime = new Date(day.getFullYear(), day.getMonth(), day.getDate(), hour.getHours(), hour.getMinutes());
        
        return reservations.filter(reservation => {
            const reservationDate = adjustTimeZone(parseISO(reservation.date));
            return isSameHour(currentDateTime, reservationDate);
        });
    };

    const handleCellClick = (day, hour) => {
        const reservationsForSlot = getReservationsForTimeSlot(day, hour);
        setSelectedReservations(reservationsForSlot);
        setSelectedDateTime(new Date(day.getFullYear(), day.getMonth(), day.getDate(), hour.getHours(), hour.getMinutes()));
        setOpen(true);
    };

    const getCellColor = (reservations) => {
        if (reservations.length === 0) return '';
        const hasPetit = reservations.some(r => r.saunaType === 'petit');
        const hasGrand = reservations.some(r => r.saunaType === 'grand');
        if (hasPetit && hasGrand) return 'both';
        if (hasPetit) return 'petit';
        if (hasGrand) return 'grand';
        return '';
    };

    const handleClose = () => setOpen(false);

    return (
        <div className="admin-calendar-container">
            <div className="calendar-header">
                <button onClick={prevWeek} className="nav-button">←</button>
                <h2 className="calendar-title">
                    {format(weekStart, 'dd', { locale: fr })} - {format(weekEnd, 'dd MMMM', { locale: fr })}
                </h2>
                <button onClick={nextWeek} className="nav-button">→</button>
            </div>
            <div className="calendar-grid">
                <div className="calendar-grid-header">
                    <div className="time-slot-header"></div>
                    {daysOfWeek.map(day => (
                        <div key={day.toISOString()} className="day-header">
                            {format(day, 'EE', { locale: fr })}
                            <div className="date-number">{format(day, 'dd', { locale: fr })}</div>
                        </div>
                    ))}
                </div>
                <div className="calendar-grid-body">
                    {hoursOfDay.map((hour, index) => (
                        <div key={index} className="time-row">
                            <div className="time-slot">{format(hour, 'HH:mm')}</div>
                            {daysOfWeek.map(day => {
                                const reservationsForSlot = getReservationsForTimeSlot(day, hour);
                                const cellColor = getCellColor(reservationsForSlot);
                                return (
                                    <div
                                        key={day.toISOString()}
                                        className={`calendar-cell ${cellColor}`}
                                        onClick={() => handleCellClick(day, hour)}
                                    ></div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
            
            <AdminCalendarModal
                open={open}
                handleClose={handleClose}
                reservations={selectedReservations}
                dateTime={selectedDateTime}
            />
        </div>
    );
}

export default AdminCalendar;

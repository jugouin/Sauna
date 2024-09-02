import React, { useState, useEffect } from "react";
import { format, startOfWeek, addWeeks, subWeeks, endOfWeek, eachDayOfInterval, eachHourOfInterval, setHours, isEqual, startOfYesterday } from 'date-fns';
import { fr } from 'date-fns/locale';

const AdminCalendar = ({reservations}) => {

    const [currentWeek, setCurrentWeek] = useState(new Date());
    const [weeklySpot, setWeeklySpot] = useState([]);

    const weekStart = startOfWeek(currentWeek, { weekStartsOn: 1 });
    const weekEnd = endOfWeek(currentWeek, { weekStartsOn: 1 });

    const daysOfWeek = eachDayOfInterval({ start: weekStart, end: weekEnd });
    const hoursOfDay = eachHourOfInterval({ start: setHours(new Date(), 10), end: setHours(new Date(), 20) });

    useEffect(() => {
        weeklyReservation();
    }, [currentWeek]);

    const prevWeek = () => {
        setCurrentWeek(subWeeks(currentWeek, 1));
    };

    const nextWeek = () => {
        setCurrentWeek(addWeeks(currentWeek, 1));
    };

    const weeklyReservation = () => {
        const spots = [];
        spots.push(hour);
        setWeeklySpot(spots);
        console.log(weeklySpot);
    };

    const isBooked = (hour) => {

        return reservations.some(reservation => {

            const reservationDate = `${reservation.date}T${reservation.startTime}:00`;
            return reservationDate === hour;
        });
    };

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
                            <div key={day} className="day-header">
                                {format(day, 'EE', { locale: fr })}
                                <div className="date-number">{format(day, 'dd', { locale: fr })}</div>
                            </div>
                        ))}
                    </div>
                    <div className="calendar-grid-body">
                        {hoursOfDay.map((hour, index) => (
                            <div key={index} className="time-row">
                                <div className="time-slot">{format(hour, 'HH:mm')}</div>
                                {daysOfWeek.map(day => (
                                    <div
                                        key={day}
                                        className={`calendar-cell ${isBooked(hour) ? 'booked' : ''}`}
                                    ></div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
    );
}

export default AdminCalendar;

import React, { useState } from "react";
import "./DailyCalendar.css";

export default function DailyCalendar({ reservations, date, handleTimeSelection }) {
    const [selectedTime, setSelectedTime] = useState(null);

    const formattedDate = date.toLocaleDateString('fr-FR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    });

    const availableHours = () => {
        const hours = [];
        for (let hour = 10; hour <= 20; hour++) {
            hours.push(`${hour.toString().padStart(2, '0')}:00`);
        }
        return hours;
    };

    const reservedHours = new Set(reservations.map(reservation => reservation.startTime));
    const hours = availableHours();

    const handleTimeClick = (hour) => {
        if (!reservedHours.has(hour)) {
            setSelectedTime(hour);
            handleTimeSelection(hour);
        }
    };

    const getAvailabilityText = (hour) => {
        const reservation = reservations.find(res => res.startTime === hour);
        return reservation
            ? `${6 - reservation.personNb} place(s) disponible(s)`
            : "6 places disponibles";
    };

    return (
        <div className="daily-calendar-wrapper">
            <h4>{formattedDate}</h4>
            {hours.map(hour => (
                <ul key={hour} className="daily-calendar" onClick={() => handleTimeClick(hour)}>
                    <li className={`calendar-hour ${selectedTime === hour ? 'selected' : ''}`}>
                        {hour}
                    </li>
                    <li className={`calendar-dispo ${selectedTime === hour ? 'selected' : ''}`}>
                        {getAvailabilityText(hour)}
                    </li>
                </ul>
            ))}
        </div>
    );
}

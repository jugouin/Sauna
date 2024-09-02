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

    const totalPlaces = 10;

    const reservationsByHour = reservations.reduce((acc, reservation) => {
        acc[reservation.startTime] = (acc[reservation.startTime] || 0) + reservation.personNb;
        return acc;
    }, {});

    const hours = availableHours();

    const handleTimeClick = (hour) => {
        if (!(reservationsByHour[hour] >= totalPlaces)) {
            setSelectedTime(hour);
            handleTimeSelection(hour);
        }
    };

    const getAvailabilityText = (hour) => {
        const reserved = reservationsByHour[hour] || 0;
        const available = totalPlaces - reserved;
        return available > 0
            ? `${available} place(s) disponible(s)`
            : "Complet";
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

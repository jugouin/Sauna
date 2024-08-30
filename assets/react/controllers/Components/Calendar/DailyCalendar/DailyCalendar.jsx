import React, { useState } from "react";
import "./DailyCalendar.css";

export default function DailyCalendar({ reservations, date, handleTimeSelection }) {
    const [selectedTime, setSelectedTime] = useState(null);

    const formatTime = (time) => {
        const date = new Date(time);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const formattedDate = date.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });

    const availableHours = () => {
        const hours = [];
        for (let hour = 10; hour <= 20; hour++) {
            hours.push(`${hour.toString().padStart(2, '0')}:00`);
        }
        return hours;
    };

    const reservedHours = new Set(reservations.map(reservation => formatTime(reservation.startTime)));
    const hours = availableHours();

    return (
        <div className="daily-calendar-wrapper">
            <h4>{formattedDate}</h4>
            {hours.map(hour => {
                const isReserved = reservedHours.has(hour);
                return (
                    <ul key={hour} className="daily-calendar">
                        <li className="calendar-hour" onClick={() => !isReserved && handleTimeSelection(hour)}>
                            {hour}
                        </li>
                        <li className="calendar-dispo">
                            {isReserved
                                ? `${6 - reservations.find(reservation => formatTime(reservation.startTime) === hour).personNb} place(s) disponible(s)`
                                : "6 places disponibles"}
                        </li>
                    </ul>
                );
            })}
        </div>
    );
}

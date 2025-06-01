import React, { useState, useEffect } from "react";
import { format, getDay } from 'date-fns';
import { fr } from 'date-fns/locale';
import "./DailyCalendar.css";

export default function DailyCalendar({ reservations, dateToDisplay, onChangeTime, personNb, saunaType, CanBePrivatized}) {
    const [selectedTime, setSelectedTime] = useState(null);

    useEffect(() => {
        setSelectedTime(null);
        console.log(selectedTime);
    }, [dateToDisplay, personNb]);

    const formattedDate = format(new Date(dateToDisplay), "EEEE d MMMM", { locale: fr });
    const maxPersons = saunaType === 'grand' ? 10 : 4;


    const isWinter = (date) => {
        const seasonStart = new Date(date.getFullYear(), 9, 1) // 1 octobre
        const seasonEnd = new Date(date.getFullYear(), 4, 2) // 2 mai
        return isAfter(date, seasonEnd) && isBefore(date, seasonStart) ? false : true
    }

    const availableHours = () => {
        const dayOfWeek = getDay(new Date(dateToDisplay));
        if (isWinter(dateToDisplay)) {
            return Array.from({ length: 12 }, (_, i) => i + 10)
                // vendredi ouvert à partir de 
                .filter(hour => !(dayOfWeek === 5 && (hour === 10 || hour === 11)))
                .map(hour => `${hour.toString().padStart(2, '0')}:00`);
        } else {
            // Fermé les mercredis, jeudis
            const closedDays = [3, 4]
            if (!(closedDays.includes(dayOfWeek))) return []

            return Array.from({ length: 8 }, (_, i) => i + 10)
                .map(hour => `${hour.toString().padStart(2, '0')}:00`);
        }
    }

    const reservationsByHour = reservations.reduce((acc, reservation) => {
        const hour = new Date(reservation.date).toISOString().substring(11, 16);
        console.log(hour);
        if (!acc[hour]) {
            acc[hour] = { reserved: 0, privatized: false, isFull: false };
        }
        acc[hour].reserved += reservation.personNb;
        acc[hour].privatized = acc[hour].privatized || reservation.privatized;
        
    
        const available = maxPersons - acc[hour].reserved;
        acc[hour].isFull = acc[hour].isFull || 
                           available <= 0 || 
                           (reservation.personNb >= 2 && available <= 2);
        
        return acc;
    }, {});

    const handleTimeClick = (hour) => {
        if(isHourSelectable(hour)){
            setSelectedTime(hour);
            onChangeTime(hour);
        }
    }

    const isHourPrivatizable = (hour) => {
        return !(reservationsByHour[hour]?.reserved > 0);
    };

    const getAvailability = (hour) => {
        const hourData = reservationsByHour[hour] || { reserved: 0, privatized: false, isFull: false };
        if (hourData.privatized || hourData.isFull) return false;
        if (saunaType === 'petit' && hourData.reserved === 1) {
            return personNb <= 1;
        }
        const available = maxPersons - hourData.reserved;
        return available >= personNb && !(hourData.reserved >= 2 && available <= 2);
    };

    const isHourSelectable = (hour) => {
        if (CanBePrivatized && !isHourPrivatizable(hour)) return false;
        if (!getAvailability(hour)) return false;

        const now = new Date();
        now.setHours(now.getHours() + 2);  
        const bookingDate = new Date(dateToDisplay);
        bookingDate.setHours(parseInt(hour.split(':')[0], 10));

        return bookingDate > now;
    };

    const getAvailabilityText = (hour) => {
        const hourData = reservationsByHour[hour] || { reserved: 0, privatized: false, isFull: false };
        
        if (CanBePrivatized && !isHourPrivatizable(hour)) return "Indisponible";
        if (hourData.privatized || hourData.isFull) return "Complet";
        
        const available = maxPersons - hourData.reserved;
        
        if (saunaType === 'petit' && hourData.reserved === 1) {
            return "1 place disponible";
        }
        
        if (hourData.reserved >= 2 && available <= 2) {
            return "Complet";
        }
        
        if (available < personNb) return `Pas assez de places (${available} disponible${available > 1 ? 's' : ''})`;
        return `${available} place${available > 1 ? 's' : ''} disponible${available > 1 ? 's' : ''}`;
    };

    return (
        <div className="daily-calendar-wrapper">
            <h4 className="calendar-header">{formattedDate}</h4>
            {availableHours().map(hour => (
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

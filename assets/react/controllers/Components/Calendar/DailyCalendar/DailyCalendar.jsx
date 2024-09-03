import React, { useState, useEffect } from "react";
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import "./DailyCalendar.css";

export default function DailyCalendar({ reservations, dateToDisplay, onChangeTime, personNb}) {

    const [selectedTime, setSelectedTime] = useState(null);

    useEffect(() => {
        setSelectedTime(null);
    }, [dateToDisplay, personNb]);


    const formattedDate = format(new Date(dateToDisplay), "EEEE d MMMM", { locale: fr });

    const availableHours = () => {
        const hours = [];
        for (let hour = 10; hour <= 20; hour++) {
            hours.push(`${hour.toString().padStart(2, '0')}:00`);
        }
        return hours;
    };
    
    const totalPlaces = 10;

    const reservationsByHour = reservations.reduce((acc, reservation) => {
        const hour = new Date(reservation.date).toISOString().substring(11, 16);
        acc[hour] = (acc[hour] || 0) + reservation.personNb;
        return acc;
    }, {});

    const hours = availableHours();

    const handleTimeClick = (hour) => {
     
        if(isHourSelectable(hour)){
            setSelectedTime(hour);
            onChangeTime(hour);
        }
    }

    const getAvailability = (hour) => {
        const reserved = reservationsByHour[hour] || 0;
        return totalPlaces - reserved >= personNb;
    };

    const isHourSelectable = (hour) => {

        if(!getAvailability(hour)){
            alert('Le créneau horaire sélectionné n\'a pas assez de places disponibles');
            setSelectedTime(null);
            return false;
        }

        const now = format(new Date(), 'yyyy-MM-dd');
        if (format(dateToDisplay, 'yyyy-MM-dd') === now){
            const currentHour = new Date().getHours();
            const hourToBook = parseInt(hour.split(':')[0], 10);

            if (currentHour >= hourToBook) {
                alert('Merci de bien vouloir sélectionner un autre créneau horaire');
                setSelectedTime(null);
                return false;
            }

        }
        return true;
    };

    const getAvailabilityText = (hour) => {
        const reserved = reservationsByHour[hour] || 0;
        const available = totalPlaces - reserved;
        return available > 0
            ? `${available} place${available > 1 ? 's' : ''} disponible${available > 1 ? 's' : ''}`
            : "Complet";
    };

    return (
        <div className="daily-calendar-wrapper">
            <h4 className="calendar-header">{formattedDate}</h4>
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

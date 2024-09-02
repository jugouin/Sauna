import React, { useState, useEffect, useRef } from "react";
import DailyCalendar from '../DailyCalendar/DailyCalendar';
import "./MonthlyCalendar.css";

export default function Calendar({ onDateChange, onTimeChange, reservations }) {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const currentDateRef = useRef(null);

  const months = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
  ];

  //Vérifie s'il reste des dispo pour rendre un jour "selectable"
  const isDaySelectable = (date) => {

    //Controle qu'on ne puisse pas réserver de jour avant aujourd'hui
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    if (date < today) {
      return false;
    }

    // Compile toute les réservations faites à une date pour voir s'il reste de la place
    const dailyReservations = getReservationsForDate(date);
    const reservedHours = new Set(dailyReservations.map(reservation => reservation.startTime));
  
  
    //Affiche seulement les heures disponibles
    for (let hour = 10; hour <= 20; hour++) {
      const formattedHour = hour.toString().padStart(2, '0') + ":00";
      if (!reservedHours.has(formattedHour)) {
        return true;
      }
    }
    return false;
  };
  
  const getReservationsForDate = (date) => {
    return reservations.filter(event => new Date(event.date).toDateString() === date.toDateString());
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    onDateChange(date);
    if (selectedTime) {
        onTimeChange(selectedTime);
    }
  };

  //Retourne le calendrier des heures d'un jour selectionné avec les réservations associées ou par défaut du jour actuel
  const renderDailyCalendar = () => {
    const dateToDisplay = selectedDate || new Date();
    const dailyReservations = getReservationsForDate(dateToDisplay);

    return (
      <DailyCalendar reservations={dailyReservations} date={dateToDisplay} handleTimeSelection={onTimeChange}/>
    );
  };

  const renderDays = () => {
  const date = new Date();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 0).getDay();
  const lastDateOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const lastDayOfMonth = new Date(currentYear, currentMonth, lastDateOfMonth -1).getDay();
  const lastDateOfLastMonth = new Date(currentYear, currentMonth, 0).getDate();

  const days = [];

  for (let i = firstDayOfMonth; i > 0; i--) {
    days.push(
      <li key={`prev-${i}`} className="inactive">
        {lastDateOfLastMonth - i + 1}
      </li>
    );
  }

  for (let i = 1; i <= lastDateOfMonth; i++) {
    const currentDate = new Date(currentYear, currentMonth, i);
    const isSelectable = isDaySelectable(currentDate);

    const isToday = i === date.getDate() && currentMonth === date.getMonth() && currentYear === date.getFullYear();
    const isSelected = selectedDate && selectedDate.getFullYear() === currentYear && selectedDate.getMonth() === currentMonth && selectedDate.getDate() === i;
    const dayClass = `${isToday ? "active" : ""} ${isSelected ? "selected" : ""} ${isSelectable ? "selectable" : ""}`;

    days.push(
      <li key={i} className={dayClass} onClick={() => isSelectable && handleDateSelect(currentDate)}>
        {i}
      </li>
    );
  }

  for (let i = lastDayOfMonth; i < 6; i++) {
    days.push(
      <li key={`next-${i}`} className="inactive">
        {i - lastDayOfMonth + 1}
      </li>
    );
  }

  return days;
};


  useEffect(() => {
    if (currentDateRef.current) {
      currentDateRef.current.innerHTML = `${months[currentMonth]} ${currentYear}`;
    }
  }, [currentYear, currentMonth]);

  const prevMonth = () => {
    setCurrentMonth(prev => {
      const newMonth = prev === 0 ? 11 : prev - 1;
      setCurrentYear(prevYear => (prev === 0 ? prevYear - 1 : prevYear));
      return newMonth;
    });
  };

  const nextMonth = () => {
    setCurrentMonth(prev => {
      const newMonth = prev === 11 ? 0 : prev + 1;
      setCurrentYear(prevYear => (prev === 11 ? prevYear + 1 : prevYear));
      return newMonth;
    });
  };

  return (
    <div className="calendar-container">
      <div className="calendar-wrapper">
        <div className="calendar-header">
          <div className="icons">
            <div className="material-symbols-outlined" onClick={prevMonth}><span>chevron_left</span></div>
          </div>
          <h4 ref={currentDateRef} className="current-date"></h4>
          <div className="icons">
            <div className="material-symbols-outlined" onClick={nextMonth}><span>chevron_right</span></div>
          </div>
        </div>
        <div className="calendar">
          <ul className="weeks">
            <li>Lun</li>
            <li>Mar</li>
            <li>Mer</li>
            <li>Jeu</li>
            <li>Ven</li>
            <li>Sam</li>
            <li>Dim</li>
          </ul>
          <ul className="days">
            {renderDays()}
          </ul>
        </div>
      </div>
      <div className="daily-calendar-wrapper">
        {renderDailyCalendar()}
      </div>
    </div>
  );
}

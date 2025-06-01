import React, { useState, useEffect, useRef } from "react";
import { format, formatISO, isBefore, isAfter, isToday, startOfDay, setHours, setMinutes } from 'date-fns';
import DailyCalendar from '../DailyCalendar/DailyCalendar';
import "./MonthlyCalendar.css";

export default function Calendar({ onDateChange, reservations, personNb, saunaType, CanBePrivatized}) {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());


  const currentDateRef = useRef(null);
  const stringHour = selectedTime || "12:30"

  const months = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
  ];

  const getReservationsForDate = (date) => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    return reservations.filter(reservation => 
      format(new Date(reservation.date), 'yyyy-MM-dd') === formattedDate
    );
  }

  const isPast = (date) => {
    const today = startOfDay(new Date())
    const targetDate = startOfDay(date)
    return isBefore(targetDate, today)
  }

  const isDayOff = (date) => {
    const isChristmas = date.getDate() === 25 && date.getMonth() === 11
    return isChristmas
  }

  const isDaySelectable = (date) => {
    return (!isPast(date) && !isDayOff(date)) || isToday(date)
  }

  const handleDateSelect = (date) => {
    setSelectedDate(date)
    handleTimeChange(date, selectedTime || stringHour)
  }
  
  const handleTimeChange = (date, time) => {
    if (date && time) {
      const [hours, minutes] = time.split(':').map(Number);
      const reservationDate = setMinutes(setHours(date, hours), minutes);
      const newDateTimeISO = formatISO(reservationDate);
      onDateChange(newDateTimeISO);
    }
  }

  const renderDailyCalendar = () => {
    const dateToDisplay = selectedDate || new Date();
    const dailyReservations = getReservationsForDate(dateToDisplay);

    return (
      <DailyCalendar 
        onChangeTime={(time) => handleTimeChange(dateToDisplay, time)} 
        reservations={dailyReservations} 
        dateToDisplay={dateToDisplay} 
        personNb={personNb}
        saunaType={saunaType}
        CanBePrivatized={CanBePrivatized}
      />
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
    const isMonday = currentDate.getDay() === 1;
    const dayClass = `${isToday ? "active" : ""} ${isSelected ? "selected" : ""} ${isSelectable ? "selectable" : ""} ${isMonday ? "disable" : ""}`;

    days.push(
      <li key={i} className={dayClass} onClick={() => isSelectable && handleDateSelect(currentDate, stringHour)}>
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

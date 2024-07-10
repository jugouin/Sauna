import React from "react";
import "./DailyCalendar.css";

export default function Calendar() {

  return (
    <div className="daily-calendar-wrapper">
        <ul className="daily-calendar">
            <li className="calendar-hour">Heure</li>
            <li className="calendar-dispo">Disponibilité</li>
        </ul>
        <ul className="daily-calendar">
            <li className="calendar-hour">10h00</li>
            <li className="calendar-dispo">2 places</li>
        </ul>
        <ul className="daily-calendar">
            <li className="calendar-hour">11h00</li>
            <li className="calendar-dispo">3 places</li>
        </ul>
        <ul className="daily-calendar">
            <li className="calendar-hour">12h00</li>
            <li className="calendar-dispo">6 places</li>
        </ul>
        <ul className="daily-calendar">
            <li className="calendar-hour">13h00</li>
            <li className="calendar-dispo">3 places</li>
        </ul>
        <ul className="daily-calendar">
            <li className="calendar-hour">14h00</li>
            <li className="calendar-dispo">8 places</li>
        </ul>
        <ul className="daily-calendar">
            <li className="calendar-hour">15h00</li>
            <li className="calendar-dispo">3 places</li>
        </ul>
        <ul className="daily-calendar">
            <li className="calendar-hour">16h00</li>
            <li className="calendar-dispo">6 places</li>
        </ul>
        <ul className="daily-calendar">
            <li className="calendar-hour">17h00</li>
            <li className="calendar-dispo">3 places</li>
        </ul>
        <ul className="daily-calendar">
            <li className="calendar-hour">18h00</li>
            <li className="calendar-dispo">8 places</li>
        </ul>
        <ul className="daily-calendar">
            <li className="calendar-hour">19h00</li>
            <li className="calendar-dispo">3 places</li>
        </ul>
        <ul className="daily-calendar">
            <li className="calendar-hour">20h00</li>
            <li className="calendar-dispo">8 places</li>
        </ul>
    </div>
  );
}

import React, { useState } from 'react';
import { Checkbox } from '@mui/material';
import { orange } from '@mui/material/colors';
import axios from 'axios';
import MonthlyCalendar from '../Calendar/MonthlyCalendar/MonthlyCalendar'
import DailyCalendar from '../Calendar/DailyCalendar/DailyCalendar'
import './FormReservation.css';


const ReservationForm = ({ evening }) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        personNb: '',
        date: '',
        message: '',
        privatization: ''
    });

    const person = [];
    for (let i = 0; i <= 10; i++) {
        person.push(<option key={i} value={i}>{i}</option>);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'personNb' ? parseInt(value, 10) : value
        });
    };


    const handleDateChange = (date) => {
        setSelectedDate(date);
        setFormData({
        ...formData,
        date: date = new Date(date)
        });
    };

    const submitForm = (e) => {
        e.preventDefault();
        console.log(formData);
        axios
            .post(`/reservation/add`, formData)
            .then((res) => {
                alert('Merci de votre réservation');
                window.location = '/';
            })
            .catch((err) => {
                console.log(err);
            });
    }

  return (
    <form onSubmit={submitForm} className='form_reservation'>
        <div className='form_section'>
            <h3>Réservation</h3>
        </div>
        <div className='form_section'>
            <div className="form_element">
                <label>
                    Nom :
                    <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    />
                </label>
            </div>
            <div className="form_element">
                <label>
                    Prénom :
                    <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    />
                </label>
            </div>
            <div className="form_element">
                <label>
                Numéro de téléphone :
                <input
                    type="tel"
                    name="phone"
                    placeholder='+41'
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />
                </label>
            </div>
            <div className="form_element">
                <label>
                    Nombre de personne(s):
                    <select
                        name="adults"
                        value={formData.adults}
                        onChange={handleChange}
                        required>
                        <option value="">--</option>
                        {person}
                    </select>
                </label>
            </div>
            <div className='form_element radio_element'>
                <label>
                    Cochez pour privatiser le sauna:
                    <Checkbox
                        checked={true}
                        onChange={handleChange}
                        name="Privatisation"
                        inputProps={{ 'aria-label': 'controlled' }}
                        sx={{ color: orange[100],
                            '&.Mui-checked': {
                              color: orange[100],
                            },
                          }}
                    />
                </label>
            </div>
        </div>
        <div className='form_section form_calendar_section'>
            <div className='monthly_calendar'>
                <MonthlyCalendar/>
            </div>
            <div className='daily_calendar'>
                <DailyCalendar/>
            </div>
        </div>
        <div className='form_section'>
            <div className='form_element'>
                <label>
                Remarques :
                <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                ></textarea>
                </label>
            </div>
        </div>
        <div className='form_section'>
            <div className='submit_btn'>
                <a className="btn main-btn" type="submit">Réserver</a>
            </div>
            <p>Merci de bien vouloir vous présentez 10min avant le début de la réservation</p>
        </div>
    </form>
  );
};

export default ReservationForm;

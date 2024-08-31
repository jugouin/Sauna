import React, { useState } from 'react';
import { Checkbox } from '@mui/material';
import { orange } from '@mui/material/colors';
import axios from 'axios';
import MonthlyCalendar from '../Calendar/MonthlyCalendar/MonthlyCalendar';
import './FormReservation.css';

const ReservationForm = ({ reservations }) => {
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        phone: '',
        personNb: '',
        date: '',
        startTime: '',
        privatized: false,
        remarks: ''
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleDateChange = (date) => {
        setFormData(prev => ({
            ...prev,
            date: new Date(date).toISOString().split('T')[0]
        }));
    };

    const handleTimeChange = (time) => {
        setFormData(prev => ({
            ...prev,
            startTime: time
        }));
    };

    const submitForm = async (e) => {
        e.preventDefault();
     
        const formDataWithNumber = {
            ...formData,
            personNb: Number(formData.personNb)
        };
        axios
            .post('/reservation/new', formDataWithNumber, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then((res) => {
                alert('Merci de votre réservation');
                window.location = '/';
            })
            .catch((err) => {
                console.error(err);
                alert('Une erreur est survenue, veuillez réessayer.');
            });
    };
    

    return (
        <form onSubmit={submitForm} className='form_reservation'>
            <div className='form_section'>
                <h3>Réservation</h3>
            </div>
            <div className='form_section'>
                {['surname', 'name', 'phone'].map(field => (
                    <div className="form_element" key={field}>
                        <label>
                            {field === 'surname' ? 'Nom :' : field === 'name' ? 'Prénom :' : 'Numéro de téléphone :'}
                            <input
                                type={field === 'phone' ? 'tel' : 'text'}
                                name={field}
                                value={formData[field]}
                                onChange={handleChange}
                                required
                                placeholder={field === 'phone' ? '+41' : ''}
                            />
                        </label>
                    </div>
                ))}
                <div className="form_element">
                    <label>
                        Nombre de personne(s) :
                        <select
                            name="personNb"
                            value={formData.personNb}
                            onChange={handleChange}
                            required
                            type="number">
                            <option value="">--</option>
                            {[...Array(10)].map((_, i) => (
                                <option key={i + 1} value={i + 1}>{i + 1}</option>
                            ))}
                        </select>
                    </label>
                </div>
                <div className='form_element radio_element'>
                    <label>
                        Cochez pour privatiser le sauna :
                        <Checkbox
                            checked={formData.privatized}
                            onChange={handleChange}
                            name="privatized"
                            inputProps={{ 'aria-label': 'controlled' }}
                            sx={{
                                color: orange[100],
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
                    <MonthlyCalendar onDateChange={handleDateChange} onTimeChange={handleTimeChange} reservations={reservations} />
                </div>
            </div>
            <div className='form_section'>
                <div className='form_element'>
                    <label>
                        Remarques :
                        <textarea
                            name="remarks"
                            value={formData.remarks}
                            onChange={handleChange}
                        ></textarea>
                    </label>
                </div>
            </div>
            <div className='form_section'>
                <div className='submit_btn'>
                    <button className="btn main-btn" type="submit">Réserver</button>
                </div>
                <p>Merci de bien vouloir vous présenter 10min avant le début de la réservation</p>
            </div>
        </form>
    );
};

export default ReservationForm;

import React, { useState, useEffect } from 'react';
import { Checkbox } from '@mui/material';
import { orange } from '@mui/material/colors';
import axios from 'axios';
import MonthlyCalendar from '../Calendar/MonthlyCalendar/MonthlyCalendar';
import './FormReservation.css';
import ReservationModal from '../Modal/ReservationModal';

const ReservationForm = ({ reservations, saunaType}) => {

    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        phone: '',
        email: '',
        date: '',
        privatized: false,
        remarks: '',
        personNb: 0,
        saunaType: ''
    });

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        window.location = '/';
    };

    useEffect(() => {
        setFormData(prev => ({
            ...prev,
            saunaType: saunaType,
        }));
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : name === 'personNb' ? parseInt(value, 10) : value
        }));
    };

    const handleDateChange = (date) => {
        setFormData(prev => ({
            ...prev,
            date: date
        }));
    };

    const submitForm = async (e) => {
        e.preventDefault();
     
        axios
            .post('/reservation/new', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then((res) => {
               handleOpen(formData);
            })
            .catch((err) => {
                console.error(err);
                alert('Une erreur est survenue, veuillez réessayer.');
            });
        
    };

    const maxPersons = formData.saunaType === 'grand' ? 10 : 4;

    return (
        <form onSubmit={submitForm} className='form_reservation'>
            <ReservationModal open={open} handleClose={handleClose} reservation={formData}/>
            <div className='form_section'>
                <h3>Réservation pour le {formData.saunaType === 'grand' ? 'grand' : 'petit'} sauna</h3>
            </div>
            <div className='form_section'>
                {['surname', 'name', 'phone', 'email'].map(field => (
                    <div className="form_element" key={field}>
                        <label>
                            {field === 'surname' ? 'Nom :' : field === 'name' ? 'Prénom :' : field === 'email' ? 'E-mail' : 'Numéro de téléphone :'}
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
                            {[...Array(maxPersons)].map((_, i) => (
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
                    <MonthlyCalendar 
                        onDateChange={handleDateChange} 
                        reservations={reservations} 
                        personNb={formData.personNb}
                        saunaType={saunaType}
                        CanBePrivatized={formData.privatized}/>
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
import React, { useState, useEffect } from 'react';
import { Checkbox } from '@mui/material';
import { orange } from '@mui/material/colors';
import MonthlyCalendar from '../Calendar/MonthlyCalendar/MonthlyCalendar';
import './FormReservation.css';
import ConditionsModal from '../Modal/ConditionsModal';
import ReservationModal from '../Modal/ReservationModal';
import ReservationMessage from '../Messages/ReservationMessage';
import axios from 'axios';
import emailjs from '@emailjs/browser';

const ReservationForm = ({ reservations, saunaType }) => {
    const [isConditionsModalOpen, setIsConditionsModalOpen] = useState(false);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        phone: '',
        email: '',
        date: '',
        privatized: false,
        remarks: '',
        personNb: 0,
        saunaType: saunaType || ''
    });

    useEffect(() => {
        setFormData(prev => ({
            ...prev,
            saunaType: saunaType,
        }));
    }, [saunaType]);
    
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : name === 'personNb' ? parseInt(value, 10) : value
        }));
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsConditionsModalOpen(true);
    };

    const handleDateChange = (date) => {
        setFormData(prev => ({
            ...prev,
            date: date
        }));
    };

    const handleClose = () => {
        setIsConfirmationModalOpen(false);
        window.location = '/';
    };

    const maxPersons = formData.saunaType === 'grand' ? 10 : 4;

    const submitForm = async () => {
        const EmailJs = ReservationMessage(formData);

        try {
            await axios.post('/reservation/new', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            await emailjs.send(
                'service_vln44yg', 
                'template_y5nfv6g', 
                {
                    email: EmailJs.email,
                    object: EmailJs.object,
                    purpose: EmailJs.purpose,
                    killian: EmailJs.killian,
                    message: EmailJs.message,
                },
                'c4Gx_uOqLJ-vykWom'
            );

            setIsConditionsModalOpen(false);
            setIsConfirmationModalOpen(true);
        } catch (err) {
            console.error(err);
            alert('Une erreur est survenue, veuillez réessayer.');
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className='form_reservation'>
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
                    <h5>Merci de bien vouloir vous présenter avec votre linge de bain et 10min avant le début de la réservation</h5>
                    <p>Le prix est 20 CHF par personne et par séance.<br/>
                    La privatisation du {saunaType} sauna et de {saunaType === 'petit' ? 40 : 120 } CHF.<br/>
                    Vous pouvez régler directement sur place en espèce ou par TWINT.<br/>
                    Toute modification ou annulation de réservation effectuée moins de 24 heures à l'avance sera due.</p>
                    <div className='submit_btn'>
                        <button className="btn main-btn" type="submit">Réserver</button>
                    </div>
                </div>
            </form>
            <ConditionsModal 
                open={isConditionsModalOpen} 
                onClose={() => setIsConditionsModalOpen(false)} 
                onSubmit={() => submitForm()}
            />
            <ReservationModal 
                open={isConfirmationModalOpen} 
                onClose={handleClose} 
                reservation={formData} 
            />
        </>
    );
};

export default ReservationForm;

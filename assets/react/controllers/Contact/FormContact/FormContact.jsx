import React, { useState } from 'react';
import './FormContact.css';
import axios from 'axios';

const FormContact = ({ evening }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        surname: '',
        phone: '',
        email: '',
        message: ''
    });

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
    <form onSubmit={submitForm} className='form_contact'>
        <div className='form_section'>
            <div className="form_element">
                <label>
                    Nom :
                    <input
                    type="text"
                    name="surname"
                    value={formData.surname}
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
                    required
                />
                </label>
            </div>
            <div className="form_element">
                <label>
                   Email:
                    <input
                        type='email'
                        name="email"
                        value={formData.email}
                        required
                    />
                </label>
            </div>
        </div>
        <div className='form_section'>
            <div className='form_element'>
                <label>
                Message :
                <textarea
                    name="message"
                    value={formData.message}
                ></textarea>
                </label>
            </div>
        </div>
        <div className='form_section'>
            <div className='submit_btn'>
                <a className="btn main-btn" type="submit">Réserver</a>
            </div>
        </div>
    </form>
  );
};

export default FormContact;

import React, { useState } from 'react';
import './FormContact.css';
import emailjs from '@emailjs/browser';

const FormContact = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        surname: '',
        phone: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const submitForm = (e) => {
        e.preventDefault();
    
        emailjs.send('service_vgq4xya', 'template_ys5k5cs', formData, 'vlOx8tchykbQmdYtj')
            .then(
                (result) => {
                    console.log('SUCCESS!', result.text);
                    setFormData({
                        firstName: '',
                        surname: '',
                        phone: '',
                        email: '',
                        message: ''
                    });
                    alert('Merci pour votre message !')
                },
                (error) => {
                    console.log('FAILED...', error.text);
                }
            )
    };

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
                        Email:
                        <input
                            type='email'
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
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
                            onChange={handleChange}
                        ></textarea>
                    </label>
                </div>
            </div>
            <div className='form_section'>
                <div className='submit_btn'>
                    <button className="btn main-btn" type="submit">
                        Envoyer
                    </button>
                </div>
            </div>
        </form>
    );
};

export default FormContact;
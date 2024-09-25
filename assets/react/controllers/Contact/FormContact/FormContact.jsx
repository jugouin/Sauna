import React, { useState } from 'react';
import './FormContact.css';
import emailjs from '@emailjs/browser';
import ContactMessage from '../../Components/Messages/ContactMessage';
import ContactModal from '../../Components/Modal/ContactModal';

const FormContact = () => {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        surname: '',
        phone: '',
        email: '',
        message: ''
    });

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        window.location = '/';
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const submitForm = (e) => {
        e.preventDefault();
    
        const EmailJs = ContactMessage(formData);
        emailjs.send(
            'service_vgq4xya',
            'template_orjdplk', 
            {
                email: EmailJs.email,
                object: EmailJs.object,
                purpose: EmailJs.purpose,
                killian: EmailJs.killian,
                message: EmailJs.message,
            },
            'vlOx8tchykbQmdYtj')
        .then((res) => {
            handleOpen(formData);
        })
        .catch((err) => {
            console.error(err);
            alert('Une erreur est survenue, veuillez réessayer.');
        }); 
    };

    return (
        <form onSubmit={submitForm} className='form_contact'>
            <ContactModal open= {open} handleClose={handleClose} formData={formData}/>
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
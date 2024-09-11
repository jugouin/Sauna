import React from 'react';
import "./Contact.css";
import img from "../Assets/plage.png";
import Header from '../Components/Header/Header';
import FormContact from './FormContact/FormContact';
import Footer from '../Components/Footer/Footer';

export default function Contact() {

    return (
        <div>
            <Header />
            <div className='header_contact_img'>
                <img src={img} alt="Plage" className='main_img' />
            </div>
            <section className='contact_section'>
                <h2>Contact</h2>
            </section>
            <FormContact />
            <Footer />
        </div>
    );
}

import React from 'react';
import "./Contact.css";
import img from "../Assets/plage.webp";
import Header from '../Components/Header/Header';
import FormContact from './FormContact/FormContact';
import Footer from '../Components/Footer/Footer';

export default function Contact() {

    return (
        <div>
            <Header />
            <div className='img_header'>
                <img src={img} alt="Plage" className='main_img' loading="lazy" />
            </div>
            <section className='contact-section'>
                <h2>Contact</h2>
            </section>
            <FormContact />
            <Footer />
        </div>
    );
}

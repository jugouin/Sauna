import React, { useState } from 'react';
import img_header from '../Assets/header_img.jpeg';
import main_img from '../Assets/home_img.png';
import Header from '../Components/Header/Header';
import Footer from '../Components/Footer/Footer';
import FormReservation from '../Components/FormReservation/FormReservation';
import "./Reservation.css";

export default function (props) {

    const reservationsObject = Object.entries(props);
    const [reservations, setReservations] = useState(JSON.parse(reservationsObject[0][1]));

    const params = new URLSearchParams(window.location.search);
    const saunaType = params.get('saunaType');

    return <div>
        <Header/>
        <div className='img_header img_resa'>
            <img src={img_header} className='main_img'/>
        </div>
        <h2 className='reservation-title'>Réservation</h2>
        <FormReservation reservations={reservations} saunaType={saunaType}/>
        <section className='reservation-section'>
            <div className='description'>
                <div>
                    <img src={main_img} className='section_img'/>
                </div>
                <div className='privatisation'>
                    <h5>Privatisation</h5>
                    <p>
                    La société K&C est fière de vous acceuillir dans ces saunas panoramiques mobiles. Des saunas fonctionnants au feu de bois pour profiter au maximum de calme et de sérénité.
                    Disposés sur des remorques, leur déplacement est rapide et ne polluent pas les lieux de manière irreverssible. Des saunas avec une bulle afin de profiter de la superbe vue qu'offre la plage de Port-Valais.
                    </p>
                </div>
            </div>
        </section>
        <Footer/>
    </div>
}
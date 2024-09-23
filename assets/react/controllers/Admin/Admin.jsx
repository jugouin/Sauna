import React, { useState } from "react";
import AdminCalendar from "../Components/Calendar/AdminCalendar/AdminCalendar";
import img_header from '../Assets/header_img.jpeg';
import Header from '../Components/Header/Header';
import Footer from '../Components/Footer/Footer';

export default function (props) {

    const reservationsObject = Object.entries(props);
    const [reservations, setReservations] = useState(JSON.parse(reservationsObject[0][1]));

    return (
        <div>
            <Header />
            <div className='img_header img_resa'>
                <img src={img_header} className='main_img' />
            </div>
            <section className='admin-section'>
                <h2>Réservations</h2>
            </section>

            <AdminCalendar reservations={reservations}/>
            <Footer />
        </div>
    );
}

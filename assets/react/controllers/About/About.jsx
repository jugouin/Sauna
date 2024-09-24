import React from 'react';
import Header from '../Components/Header/Header';
import img_header from '../Assets/header_img.jpeg';
import main_img from '../Assets/home_img.png';
import Card from '../Components/Card/Card';
import Footer from '../Components/Footer/Footer';
import "./About.css";
import CardMap from '../Components/CardMap/cardMap';

export default function () {

    const text1 = "Notre petit sauna, conçu pour accueillir jusqu'à 4 personnes, est idéal pour un moment de détente en toute intimité. Que vous soyez seul, en couple ou entre amis, réservez facilement votre créneau et plongez dans une ambiance apaisante et relaxante."
    const text2 = "Notre grand sauna, pouvant accueillir jusqu’à 10 personnes, est parfait pour vivre un moment de détente en groupe dans une ambiance chaleureuse et conviviale. Idéal pour se relaxer entre amis, en famille ou lors d’un événement spécial, ce sauna spacieux vous offre un cadre apaisant pour partager un instant bien-être."

    const title = 'Découvrir';
    const className = "about";

    return <div>
        <Header/>
        <div className='img_header'>
            <img src={img_header} className='main_img'/>
        </div>
        <section className="about-section">
            <h2>Présentation</h2>
            <div className='description'>
                <div>
                    <img src={main_img} className='section_img'/>
                </div>
                <p className='about-description'>
                Plongez dans un moment de détente absolue avec nos séances de sauna privatisées. Réservez votre créneau en ligne pour profiter d'un espace confortable, apaisant, 
                et parfaitement adapté pour vous ressourcer. Que ce soit après une longue journée de travail ou pour une pause bien-être, laissez-vous envelopper par la chaleur 
                bienfaisante et les bienfaits de la relaxation profonde. Il suffit de choisir l'heure qui vous convient le mieux, et nous nous occupons du reste !
                </p>
            </div>
        </section>
        <div className='about-cards'>
            <Card text={text1} title={title} className={className}/>
            <Card text={text2} title={title} className={className}/>
        </div>
        <section className='description'>
            <CardMap />
            <p className='about-description'>
            Besoin de faire une pause ? Notre service de réservation de sauna vous permet de programmer votre moment de détente selon vos disponibilités. 
            Que vous soyez à la recherche d’un moment de calme en solo ou d’une séance à partager avec des amis, vous trouverez des créneaux adaptés à votre rythme. 
            Réservez dès maintenant et laissez-vous transporter dans un espace de chaleur et de sérénité.
            </p>
        </section>
        <Footer/>
    </div>
}
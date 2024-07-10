import React from 'react';
import Header from './Components/Header/Header';
import main_img from './Assets/home_img.png';
import img_header from './Assets/header_img.jpeg';
import Card from './Components/Cards/HomePageCard/Card';
import Footer from './Components/Footer/Footer';
import './Home.css';

export default function () {
    return <div>
        <Header/>
        <div className='img_header'>
            <img src={img_header} className='main_img'/>
        </div>
        <section>
            <h2>Location de Sauna</h2>
            <div className='description'>
                <div>
                    <img src={main_img} className='section_img'/>
                </div>
                <p className='p_description'>
                    La société K&C est fière de vous acceuillir dans ces saunas panoramiques mobiles. Des saunas fonctionnants au feu de bois pour profiter au maximum de calme et de sérénité.
                    Disposés sur des remorques, leur déplacement est rapide et ne polluent pas les lieux de manière irreverssible. Des saunas avec une bulle afin de profiter de la superbe vue qu'offre la plage de Port-Valais.
                    Imaginez vous dans un tonneau a 80 degrés à regarder dehors les sommets des montagnes enneigés. Une expérience unique alliant bien-être et nature.
                </p>
            </div>
        </section>
        <div className='card-group home-cards'>
            <Card/>
            <Card/>
            <Card/>
        </div>
        <Footer/>
    </div>
}

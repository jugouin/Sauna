import React from 'react';
import Header from '../Components/Header/Header';
import img_header from '../Assets/header_img.jpeg';
import main_img from '../Assets/home_img.png';
import Card from '../Components/Card/Card';
import Footer from '../Components/Footer/Footer';
import "./About.css";
import CardMap from '../Components/CardMap/cardMap';

export default function () {

    const text1 = "Nous vous proposons un sauna pour 4 personnes. Imaginez-vous dans un tonneau à 80 degrés, regardant dehors les sommets des montagnes enneigées. Des saunas fonctionnants au feu de bois pour profiter au maximum de calme et de sérénité. Disposés sur des remorques, leur déplacement est rapide et ne polluent pas les lieux de manière irreverssible."
    const text2 = "Nous vous proposons un sauna pour 10 personnes. Des saunas fonctionnants au feu de bois pour profiter au maximum de calme et de sérénité. Disposés sur des remorques, leur déplacement est rapide et ne polluent pas les lieux de manière irreverssible. Imaginez-vous dans un tonneau à 80 degrés, regardant dehors les sommets des montagnes enneigées."

    const title = 'Découvrir';
    const className = "about";

    return <div>
        <Header/>
        <div className='img_header'>
            <img src={img_header} className='main_img'/>
        </div>
        <section>
            <h2>Présentation</h2>
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
        <div className='about-cards'>
            <Card text={text1} title={title} className={className}/>
            <Card text={text2} title={title} className={className}/>
        </div>
        <section className='description'>
            <CardMap />
            <p className='p_description'>
                La société K&C est fière de vous acceuillir dans ces saunas panoramiques mobiles. Des saunas fonctionnants au feu de bois pour profiter au maximum de calme et de sérénité.
                Disposés sur des remorques, leur déplacement est rapide et ne polluent pas les lieux de manière irreverssible. 
            </p>
        </section>
        <Footer/>
    </div>
}
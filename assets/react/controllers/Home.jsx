import React from 'react';
import Header from './Components/Header/Header';
import main_img from './Assets/home_img.webp';
import img_header from './Assets/header_img.webp';
import Card from './Components/Card/Card';
import Footer from './Components/Footer/Footer';
import './Home.css';

export default function Home() {

    const Text1 = "Le Bouveret, situé en Valais au bord du lac Léman, partez à la découverte d'une destination unique.";
    const Text2 = "Nos saunas sont installés dans un cadre calme et naturel, propice à la détente et à l’évasion.";
    const Text3 = "Nichés dans un environnement apaisant, nos espaces sont pensés pour vous offrir confort et sérénité, avec des installations modernes et un design chaleureux.";

    const title = "Futur projet...";
    const className = "homepage";


    return (
        <div>
            <Header />
            <div className='img_header'>
                <img src={img_header} className='main_img' alt="Image d'en-tête" />
            </div>
            <section className='home-section'>
                <h2>Location de Sauna</h2>
                <div className='description'>
                    <div>
                        <img src={main_img} className='section_img' alt="Image sauna" />
                    </div>
                    <p className='home-description'>
                        La société K&C est fière de vous accueillir dans ses saunas panoramiques mobiles. Des saunas fonctionnant au feu de bois pour profiter au maximum de calme et de sérénité.
                        Disposés sur des remorques, leur déplacement est rapide et ne pollue pas les lieux de manière irréversible. Des saunas avec une bulle afin de profiter de la superbe vue qu'offre la plage de Port-Valais.
                        Imaginez-vous dans un tonneau à 80 degrés, regardant dehors les sommets des montagnes enneigées. Une expérience unique alliant bien-être et nature.
                    </p>
                </div>
            </section>
            <div className='home-cards'>
                <Card text={Text1} title={title} className={className}/>
                <Card text={Text2} title={title} className={className}/>
                <Card text={Text3} title={title} className={className}/>
            </div>
            <Footer />
        </div>
    );
}

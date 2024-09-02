import React from "react";
import img_header from '../Assets/header_img.jpeg';
import Header from '../Components/Header/Header';
import Footer from '../Components/Footer/Footer';
import axios from "axios";

export default function () {

    const submitForm = async (e) => {
        e.preventDefault();
     
        axios
            .post('/login', {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then((res) => {
                window.location = '/adminHomepage';
            })
            .catch((err) => {
                console.error(err);
                alert('Une erreur est survenue, veuillez réessayer.');
            });
    };

    return <div>
        <Header/>
        <div className='img_header img_resa'>
            <img src={img_header} className='main_img'/>
        </div>
        <section className='contact_section'>
            <h2>Connexion</h2>
        </section>
        <form onSubmit={submitForm} className='form_reservation'>
            <div className='form_section d-flex'>
                <div className='form_element'>
                    <label>Login :
                        <input
                        type="login"
                        name="login"
                    
                        required
                        />
                    </label>
                </div>
                <div className='form_element'>
                    <label>Mot de passe :
                        <input
                        type="password"
                        name="password"
                    
                        required
                        />
                    </label>
                    </div>
                </div>
            <div className='form_section'>
                <div className='submit_btn'>
                    <button className="btn main-btn" type="submit">Se connecter</button>
                </div>
            </div>
        </form>
        <Footer/>
    </div>
}
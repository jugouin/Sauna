import React from 'react';
import Header from './Header/Header';
import main_img from './home_img.png';
import './Home.css';

export default function () {
    return <div>
        <Header/>
        <div className='img_header'>
            <img src={main_img} className='main_img'/>
        </div>
        <section>
            <h2>Location de Sauna</h2>
            <div className='description'>
                <div>
                    <img src={main_img} className='secondary_img'/>
                </div>
                <p className='p_description'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </p>
            </div>
        </section>
    </div>;
}

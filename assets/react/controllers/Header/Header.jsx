import React from 'react';
import logo from './logo.png';
import "./Header.css";

export default function () {
    return <div className='header-content'>
        <div className="logo">
            <img src={logo} alt="Logo du site" className='logo'/>
        </div>
        <nav className="menu-header">
            <ul>
                <li><a href="#">Réservation</a></li>
                <li><a href="#">A propos</a></li>
                <li><a href="#">Contact</a></li>
            </ul>
        </nav>
    </div>;
}

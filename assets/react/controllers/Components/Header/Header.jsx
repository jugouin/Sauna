import React from 'react';
import logo from '../../Assets/logo.png';
import "./Header.css";

export default function () {
    return <div className='header-content'>
        <div className="logo">
            <a href="/">
                <img src={logo} className='logo' alt="Logo du site"/>
            </a>
        </div>
        <nav className="menu-header">
            <ul>
                <li><a href="/reservation">Réservation</a></li>
                <li><a href="/about">A propos</a></li>
                <li><a href="/contact">Contact</a></li>
            </ul>
        </nav>
    </div>;
}

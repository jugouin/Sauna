import React from 'react';
import logo from '../../Assets/logo.png';
import "./Footer.css";

export default function () {

    return <div className='footer'>
        <div className='footer-container'>
            <div className="logo">
                <a href="/">
                    <img src={logo} className='logo' alt="Logo du site"/>
                </a>
            </div>
            <div className='container footer-info footer-container'>
                <p>kandc1897@gmail.com</p>
                <p>079 968 16 31</p>
            </div>
            <div>
                <span className="material-symbols-outlined"><a href="/admin">person</a></span>
            </div>
        </div>
    </div>
}
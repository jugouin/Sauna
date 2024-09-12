import React, { useState } from 'react';
import logo from '../../Assets/logo.png';
import Modal from '../Modal/SaunaModal';
import "./Header.css";

export default function () {

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const title = "Quel sauna souhaitez-vous réserver ?"

    return <div className='header-content'>
        <div className="logo">
            <a href="/">
                <img src={logo} className='logo' alt="Logo du site"/>
            </a>
        </div>
        <nav className="menu-header">
            <ul>
                <li><a onClick={handleOpen} >Réservation</a></li>
                <Modal open={open} handleClose={handleClose} title={title}/>
                <li><a href="/about">A propos</a></li>
                <li><a href="/contact">Contact</a></li>
            </ul>
        </nav>
    </div>;
}
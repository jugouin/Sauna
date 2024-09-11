import React, { useState } from 'react';
import img from '../img/card_1.png';
import '../Cards.css';
import './Card.css';
import CardModal from '../../Modal/Modal';

export default function Card({ text }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="card about_card">
      <div className="card-body about-card-body">
        <p className="card-text about-card-text">{text}</p>
        <button onClick={handleOpen} className='btn main-btn card-btn about-card-btn'>Découvrir</button>
        <CardModal open={open} handleClose={handleClose} />
      </div>
      <img className="card-img about-card-img" src={img} alt="Card image cap"/>
  </div>
  );
}
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
    <div className="card homepage-card">
      <img className="card-img homepage-card-img" src={img} alt="Card image cap" />
      <div className="card-body homepage-card-body">
        <p className="card-text">{text}</p>
        <button onClick={handleOpen} className='btn main-btn card-btn homepage-card-btn'>Découvrir</button>
        <CardModal open={open} handleClose={handleClose} />
      </div>
    </div>
  );
}

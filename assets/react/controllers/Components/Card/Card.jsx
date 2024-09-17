import React, { useState } from 'react';
import img from './img/card_1.png';
import './Card.css';
import CardModal from '../Modal/CardModal';

export default function Card({ text, title, className }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className={`card ${className}-card`}>
      <img className={`card-img ${className}-card-img`} src={img} alt="Card image cap" />
      <div className={`card-body ${className}-card-body`}>
        <p className="card-text">{text}</p>
        <button onClick={handleOpen} className={`btn main-btn ${className}-card-btn`}>Découvrir</button>
        <CardModal open={open} handleClose={handleClose} title={title} text={text}/>
      </div>
    </div>
  );
}

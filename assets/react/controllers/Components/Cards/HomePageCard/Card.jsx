import React from 'react';
import img from '../img/card_1.png';
import '../Cards.css';
import './Card.css';

export default function () {
    return <div className="card homepage-card">
    <img className="card-img homepage-card-img" src={img} alt="Card image cap"/>
    <div className="card-body homepage-card-body">
      <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      <a href="/reservation" className="btn main-btn homepage-card-btn">Réserver</a>
    </div>
  </div>
}

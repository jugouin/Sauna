import React from 'react';
import img from '../img/card_1.png';
import '../Cards.css';
import './Card.css';

export default function () {
    return <div className="card secondary_card">
      <div className="card-body secondary-card-body">
        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content. Ccard title and make up the bulk of the card's content. Eexample text to build on the card title</p>
        <a href="/reservation" className="btn main-btn card-btn secondary-card-btn">Réserver</a>
      </div>
      <img className="card-img secondary-card-img" src={img} alt="Card image cap"/>
  </div>
}

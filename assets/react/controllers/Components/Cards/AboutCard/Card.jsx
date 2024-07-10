import React from 'react';
import img from '../img/card_1.png';
import '../Cards.css';
import './Card.css';

export default function () {
    return <div className="card about_card">
      <div className="card-body about-card-body">
        <p className="card-text about-card-text">Some quick example text to build on the card title and make up the bulk of the card's content. Ccard title and make up the bulk of the card's content. Eexample text to build on the card title</p>
        <a href="/reservation" className="btn main-btn card-btn about-card-btn">Réserver</a>
      </div>
      <img className="card-img about-card-img" src={img} alt="Card image cap"/>
  </div>
}

import React from 'react';
import img from './img/card_1.png';
import './Card.css';

export default function () {
    return <div className="card">
    <img className="card-img-top" src={img} alt="Card image cap"/>
    <div className="card-body">
      <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      <a href="#" className="btn main-btn">Réserver</a>
    </div>
  </div>
}

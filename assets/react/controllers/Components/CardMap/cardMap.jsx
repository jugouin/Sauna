import React, { useEffect } from 'react';
import L from 'leaflet';
import './cardMap.css';

export default function CardMap() {
    useEffect(() => {

        const map = L.map('map').setView([46.38905668629433, 6.859803836945831], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.marker([46.38905668629433, 6.859803836945831]).addTo(map)
            .bindPopup('Some text')
            .openPopup();

        // Optionnel : Nettoyer la carte lors du démontage du composant
        return () => {
            map.remove();
        };
    }, []);

    return (
        <div className='map-container'>
            <div className="map" id="map"></div>
        </div>
    );
}

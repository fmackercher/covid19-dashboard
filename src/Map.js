import React from 'react';
import './Map.css';
import { MapContainer, TileLayer } from 'react-leaflet';
import { mapMarkers } from './util';

function Map({ countries, casesType, center, zoom }) {
    return (
        <div className="map">
            <MapContainer center={center} zoom={zoom} scrollWheelZoom={false}>
                <TileLayer
                    url='https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
                    attribute='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    className='map-tiles'
                />
                {mapMarkers(countries, casesType)}
            </MapContainer>
        </div>
    );
}

export default Map;

/* Leaflet dark theme: https://gist.github.com/BrendonKoz/b1df234fe3ee388b402cd8e98f7eedbd
*/

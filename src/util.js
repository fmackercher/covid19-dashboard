import React from 'react';
import { Circle, Popup } from 'react-leaflet';
import numeral from 'numeral';

const casesColors = {
    cases: {
        hex: "#FF0000",
        half_op: "rgba(204, 16, 52, 0.5)",
        multiplier: 100, //circle size
    },
};

export const sortData = (data) => {
    const sortedData = [...data];

    sortedData.sort((a, b) => {
        if (a.cases > b.cases) {
            return -1;
        } else {
            return 1;
        }
    })
    return sortedData;
};

// Popups on map
export const mapMarkers = (data, casesType = 'cases') => (
    data.map(country => (
        <Circle
            center={[country.countryInfo.lat, country.countryInfo.long]}
            fillOpacity={0.3}
            color={casesColors[casesType].hex}
            fillColor={casesColors[casesType].hex}
            radius={Math.sqrt(country[casesType]) * casesColors[casesType].multiplier}
        >
            <Popup>
                <div>
                    <div><strong>{country.country}</strong></div>
                    <div>Cases: {numeral(country.cases).format("0,0")}</div>
                    <div>Recovered: {numeral(country.recovered).format("0,0")}</div>
                    <div>Deaths: {numeral(country.deaths).format("0,0")}</div>
                </div>
            </Popup>
        </Circle>
    ))
);


import React from 'react'
import './Table.css'
import numeral from 'numeral';

function Table({ countries }) {
    return (
        <div className='table'>
            {countries.map(({ country, cases, countryInfo }) => (
                <tr>
                    <td className='table-flag' style={{ backgroundImage: `url(${countryInfo.flag})` }}></td>
                    <td>{country}</td>
                    <td>{numeral(cases).format('0,0')}</td>
                </tr>
            ))}
        </div>
    );
}

export default Table;

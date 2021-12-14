import React from 'react'
import './Table.css'

function Table({ countries }) {
    return (
        <div className='table'>
            {countries.map(({ country, cases, countryInfo }) => (
                <tr>
                    <td className='table-flag' style={{ backgroundImage: `url(${countryInfo.flag})` }}></td>
                    <td>{country}</td>
                    <td>{cases}</td>
                </tr>
            ))}
        </div>
    );
}

export default Table;


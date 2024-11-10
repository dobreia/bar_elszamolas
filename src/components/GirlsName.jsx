import React from 'react';
import xIcon from '../assets/x-icon.svg'; // Importáld az ikon képet

const GirlsName = ({ girlsName }) => {
    return (
        <div className='container'>
            {girlsName.map((girl, index) => (
                <div className='girl-row' key={index}>
                    <span>{girl}</span>
                    <img src={xIcon} alt="Remove icon" />
                </div>
            ))}
        </div>
    )
}

export default GirlsName;

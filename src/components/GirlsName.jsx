import React from 'react';
import xIcon from '../assets/x-icon.svg';
import deleteGirl from '../database/DeleteGirl';

const GirlsName = ({ girlsName, setGirlsName }) => {
    const handleDelete = async (girlName) => {
        try {
            await deleteGirl(girlName); // Az adatbázisból törlés
            setGirlsName(prevGirls => prevGirls.filter(girl => girl !== girlName)); // Az állapot frissítése
        } catch (error) {
            console.error('Hiba történt a törlés során.', error);
        }
    };

    return (
        <div className='container'>
            {girlsName.map((girl, index) => (
                <div className='girl-row' key={index}>
                    <span>{girl}</span>
                    <img
                        src={xIcon}
                        alt="Remove icon"
                        onClick={() => handleDelete(girl)}
                    />
                </div>
            ))}
        </div>
    )
}

export default GirlsName;

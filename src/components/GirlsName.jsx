import React, { useState } from 'react';
import xIcon from '../assets/x-icon.svg';
import deleteGirl from '../database/DeleteGirl';
import AddGirl from '../database/AddGirl';


const GirlsName = ({ girlsName, setGirlsName }) => {
    const [newGirlName, setNewGirlName] = useState('');

    const handleAdd = async (girlName) => {
        if (girlName.trim() === '') {
            alert("A név nem lehet üres!");
            return;
        }
        try {
            await AddGirl(girlName);
            setGirlsName(prevGirls => [girlName, ...prevGirls]);
            setNewGirlName('');
        } catch {
            console.error("Hiba történt a lány hozzáadása során.");
        }
    }

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
            <div className="new-girl">
                <input
                    className='new-girl-input'
                    placeholder='Adj hozzá új nevet!'
                    type="text"
                    value={newGirlName}
                    onChange={(e) => setNewGirlName(e.target.value)}
                />
                <button onClick={() => handleAdd(newGirlName)} className='new-girl-btn'>Hozzáadás</button>
            </div>
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

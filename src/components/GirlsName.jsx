import React, { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../database/firebase-config';
import xIcon from '../assets/x-icon.svg';
import editIcon from '../assets/edit-icon.png';
import deleteGirl from '../database/DeleteGirl';
import AddGirl from '../database/AddGirl';
import EditGirl from '../database/EditGirl';
import '../styles/GirlsName.css'


const GirlsName = ({ girlsName, setGirlsName }) => {
    const [newGirlName, setNewGirlName] = useState('');
    const [editIndex, setEditIndex] = useState(null); // Szerkesztési állapotot tároló index
    const [editedGirlName, setEditedGirlName] = useState(''); // Az új név tárolása szerkesztés alatt

    const handleAdd = async (girlName) => {
        if (girlName.trim() === '') {
            alert("A név nem lehet üres!");
            return;
        }
        try {
            await AddGirl(girlName);
            setNewGirlName('');
        } catch {
            console.error("Hiba történt a lány hozzáadása során.");
        }
    };

    const handleDelete = async (girlID) => {
        try {
            await deleteGirl(girlID);
        } catch (error) {
            console.error('Hiba történt a törlés során.', error);
        }
    };

    const handleEditClick = (index, currentName) => {
        setEditIndex(index);
        setEditedGirlName(currentName);
    };

    const handleEditChange = (e) => {
        setEditedGirlName(e.target.value);
    };

    const handleEditSave = async (girlID) => {
        try {
            await EditGirl(girlID, { name: editedGirlName });
            setEditIndex(null); // Szerkesztés lezárása
        } catch (error) {
            console.error('Hiba történt a szerkesztés során.', error);
        }
    };

    return (
        <div className='main-content'>
            <div className="new-girl-container container">
                <input
                    className='new-girl-input'
                    placeholder='Adj hozzá új nevet!'
                    type="text"
                    value={newGirlName}
                    onChange={(e) => setNewGirlName(e.target.value)}
                />
                <button onClick={() => handleAdd(newGirlName)} className='new-girl-btn btn'>Hozzáadás</button>
            </div>
            {girlsName.sort((a, b) => a.name.localeCompare(b.name)).map((girl, index) => (
                <div className={editIndex === index ? 'edit-girl-container container' : 'girl-row-container container'} key={girl.id}>
                    {editIndex === index ? (
                        <>
                            <input
                                className='edit-girl-input'
                                type="text"
                                value={editedGirlName}
                                onChange={handleEditChange}
                            />
                            <button className="edit-girl-btn btn" onClick={() => handleEditSave(girl.id)}>Mentés</button>
                        </>
                    ) : (
                        <>
                            <span>{girl.name}</span>
                            <div className='actions'>
                                <img
                                    className='remove'
                                    src={xIcon}
                                    alt="Remove icon"
                                    onClick={() => handleDelete(girl.id)}
                                />
                                <img
                                    className='edit'
                                    src={editIcon}
                                    alt="Edit icon"
                                    onClick={() => handleEditClick(index, girl.name)}
                                />
                            </div>
                        </>
                    )}

                </div>
            ))}
        </div>
    );
};

export default GirlsName;

import React, { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../database/firebase-config';
import xIcon from '../assets/x-icon.svg';
import editIcon from '../assets/edit-icon.png';
import deleteGirl from '../database/DeleteGirl';
import AddGirl from '../database/AddGirl';

const GirlsName = ({ setGirlsName }) => {
    const [girlsName, setGirlsNameState] = useState([]);
    const [newGirlName, setNewGirlName] = useState('');
    const [editIndex, setEditIndex] = useState(null); // Szerkesztési állapotot tároló index
    const [editedGirlName, setEditedGirlName] = useState(''); // Az új név tárolása szerkesztés alatt

    useEffect(() => {
        // Lekérdezés az adatbázisból
        const unsubscribe = onSnapshot(collection(db, 'girls'), (snapshot) => {
            const girlsList = snapshot.docs.map(doc => doc.data().name);
            setGirlsNameState(girlsList);
        });

        return () => unsubscribe();
    }, []);

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

    const handleDelete = async (girlName) => {
        try {
            await deleteGirl(girlName);
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

    const handleEditSave = (index) => {
        // Frissítsd az állapotot az új névvel
        const updatedGirls = [...girlsName];
        updatedGirls[index] = editedGirlName;
        setGirlsNameState(updatedGirls);
        setEditIndex(null); // Szerkesztés befejezése
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
                <div className={`girl-row ${editIndex === index ? 'editing' : ''}`} key={index}>
                    {editIndex === index ? (
                        <input className='edit-girl-input'
                            type="text"
                            value={editedGirlName}
                            onChange={handleEditChange}
                            onBlur={() => handleEditSave(index)} // Szerkesztés mentése fókuszvesztéskor
                            autoFocus
                        />
                    ) : (
                        <span>{girl}</span>
                    )}
                    <div className='actions'>
                        <img
                            className='remove'
                            src={xIcon}
                            alt="Remove icon"
                            onClick={() => handleDelete(girl)}
                        />
                        <img
                            className='edit'
                            src={editIcon}
                            alt="Edit icon"
                            onClick={() => handleEditClick(index, girl)}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default GirlsName;

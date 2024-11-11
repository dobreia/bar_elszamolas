import React, { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../database/firebase-config'; // Az adatbázis konfigurációdat tartalmazó fájl
import xIcon from '../assets/x-icon.svg';
import deleteGirl from '../database/DeleteGirl';
import AddGirl from '../database/AddGirl';

const GirlsName = ({ setGirlsName }) => {
    const [girlsName, setGirlsNameState] = useState([]);
    const [newGirlName, setNewGirlName] = useState('');

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'girls'), (snapshot) => {
            const girlsList = snapshot.docs.map(doc => doc.data().name);
            setGirlsNameState(girlsList);
        });

        // Takarítás a hallgató törléséhez a komponens leszerelésekor
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
    }

    const handleDelete = async (girlName) => {
        try {
            await deleteGirl(girlName); // Az adatbázisból törlés
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

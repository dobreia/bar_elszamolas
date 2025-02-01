import React, { useEffect, useState } from 'react';
import xIcon from '../assets/x-icon.svg';
import editIcon from '../assets/edit-icon.png';
import deleteGirl from '../database/Girls/DeleteGirl';
import AddGirl from '../database/Girls/AddGirl';
import EditGirl from '../database/Girls/EditGirl';
import '../styles/GirlsName.css'


const GirlsName = ({ girlsName, setGirlsName }) => {
    const [newGirlName, setNewGirlName] = useState('');
    const [isAddActive, setIsAddActive] = useState(false);
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const filteredGirlsName = girlsName.filter(girl => girl.name.toLowerCase().startsWith(searchQuery.toLowerCase()));
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

    const handleEditSave = async (girlID) => {
        try {
            await EditGirl(girlID, { name: editedGirlName });
            setEditIndex(null); // Szerkesztés lezárása
        } catch (error) {
            console.error('Hiba történt a szerkesztés során.', error);
        }
    };

    return (
        <div className='girls-main-content'>
            <div className="girls-new-container girls-container">
                <button onClick={() => { setIsAddActive(prev => !prev); setIsSearchActive(false) }} className='services-btn service-new-button'>Új lány</button>
                <button onClick={() => { setIsSearchActive(prev => !prev); setIsAddActive(false) }} className='services-btn service-search-button'>Keresés</button>
            </div>
            {isAddActive && (
                <>
                    <div className="girls-new-container girls-container">
                        <input
                            className='girls-new-input'
                            placeholder='Adj hozzá új nevet!'
                            type="text"
                            value={newGirlName}
                            onChange={(e) => setNewGirlName(e.target.value)}
                        />
                        <button onClick={() => handleAdd(newGirlName)} className='girls-btn'>Hozzáadás</button>
                    </div>
                </>
            )
            }
            {isSearchActive && (
                <>
                    <div className='girls-search-container girls-container'>
                        <input
                            className='girls-search-input'
                            type="text"
                            placeholder='Keresés...'
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                </>
            )}
            {filteredGirlsName.sort((a, b) => a.name.localeCompare(b.name)).map((girl, index) => (
                <div
                    className={editIndex === index
                        ? 'girls-edit-container girls-container'
                        : 'girls-row-container girls-container'}
                    key={girl.id}
                >
                    {editIndex === index ? (
                        <>
                            <input
                                className='girls-edit-input'
                                type="text"
                                value={editedGirlName}
                                onChange={handleEditChange}
                            />
                            <button className="girls-btn" onClick={() => handleEditSave(girl.id)}>Mentés</button>
                        </>
                    ) : (
                        <>
                            <span>{girl.name}</span>
                            <div className='girls-actions'>
                                <img
                                    className='girls-remove'
                                    src={xIcon}
                                    alt="Remove icon"
                                    onClick={() => handleDelete(girl.name)}
                                />
                                <img
                                    className='girls-edit'
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

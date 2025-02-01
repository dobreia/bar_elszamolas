import React, { useState } from 'react';
import xIcon from '../assets/x-icon.svg';
import editIcon from '../assets/edit-icon.png';
import deleteService from '../database/Services/DeleteService';
import addService from '../database/Services/AddService';
import EditService from '../database/Services/EditService';
import '../styles/Services.css';

const Services = ({ services, setServices }) => {
    const [openTab, setOpenTab] = useState(null); // Kibontott tab indexe
    const [isAddActive, setIsAddActive] = useState(false);
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [editIndex, setEditIndex] = useState(null); // Szerkesztési állapotot tároló index
    const [editedService, setEditedService] = useState({}); // Az aktuálisan szerkesztett adatokat tárolja
    const [newService, setNewService] = useState({
        name: '',
        type: '',
        price: '',
        commission: ''
    });

    // Dropdown kibontása vagy bezárása
    const toggleDropdown = (index) => {
        // Ha szerkesztési módban vagyunk, csak kibontani engedi a tabot, bezárni nem
        if (editIndex !== null) {
            setOpenTab(index);
        } else {
            // Kibontás vagy bezárás logikája
            setOpenTab(openTab === index ? null : index);
        }
    };

    // Szerkesztési mód aktiválása és az aktuális adatok betöltése
    const handleEditClick = (index, currentService) => {
        setEditIndex(index); // A szerkesztési módot aktiválja az aktuális indexre
        setOpenTab(index); // Automatikusan kibontja a tabot
        setEditedService({ ...currentService }); // Betölti az aktuális service adatait a szerkesztett állapotba
    };

    // Szerkesztési változtatások követése az input mezőkben
    const handleEditChange = (field, value) => {
        setEditedService((prev) => ({ ...prev, [field]: value })); // Frissíti az adott mező értékét
    };

    const handleAdd = async () => {
        // Ellenőrzés: minden mező ki van-e töltve
        if (!newService.name || !newService.type || !newService.price || !newService.commission) {
            alert("Minden mezőt ki kell tölteni!");
            return;
        }

        try {
            // Új szolgáltatás hozzáadása Firestore-hoz
            await addService(newService.name, newService.type, newService.price, newService.commission);

            // Mezők törlése
            setNewService({
                name: '',
                type: '',
                price: '',
                commission: ''
            });

            // Hozzáadó form bezárása
            setIsAddActive(false);
        } catch (error) {
            console.error("Hiba történt a szolgáltatás hozzáadásakor:", error);
            alert("Hiba történt a szolgáltatás mentésekor.");
        }
    };


    // Szerkesztett adatok mentése
    const handleEditSave = async (serviceId) => {
        try {
            // Adatok frissítése Firestore-ban
            await EditService(serviceId, editedService.name, editedService.type, editedService.price, editedService.commission);

            console.log("Szolgáltatás sikeresen frissítve az adatbázisban!");

            setEditIndex(null); // Kilépés a szerkesztési módból
            setOpenTab(null); // Bezárjuk a szerkesztett tabot
        } catch (error) {
            console.error("Hiba történt a szerkesztés mentésekor:", error);
            alert("Nem sikerült a mentés!");
        }
    };

    const handleCancelEdit = () => {
        setEditedService({});
        setEditIndex(null);
    }

    const handleDelete = async (serviceName) => {
        try {
            await deleteService(serviceName)
        } catch (error) {
            console.error("Hiba történt a törlés során", error);
        }
    }

    return (
        <div className="services-main-content">
            {/* Új szolgáltatás hozzáadása */}
            <div className="services-new-container services-container">
                <button onClick={() => { setIsAddActive(true); setIsSearchActive(false) }} className='services-btn service-new-button'>Új szolgáltatás</button>
                <button onClick={() => { setIsSearchActive(true); setIsAddActive(false) }} className='services-btn service-search-button'>Keresés</button>
            </div>
            {isAddActive && (
                <>
                    <div className='services-add-dropdown'>
                        <p className='services-add-dropdown-item'>
                            <label htmlFor="type">Név</label>
                            <input
                                id="type"
                                type="text"
                                placeholder='Név'
                                value={newService.name}
                                onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                            />
                        </p>
                        <p className='services-add-dropdown-item'>
                            <label htmlFor="type">Típus</label>
                            <input
                                id="type"
                                type="text"
                                placeholder='Típus'
                                value={newService.type}
                                onChange={(e) => setNewService({ ...newService, type: e.target.value })}
                            />
                        </p>
                        <p className='services-add-dropdown-item'>
                            <label htmlFor="price">Ár</label>
                            <input
                                id="price"
                                type="number"
                                placeholder='Ár'
                                value={newService.price}
                                onChange={(e) => setNewService({ ...newService, price: e.target.value })}
                            />
                        </p>
                        <p className='services-add-dropdown-item'>
                            <label htmlFor="commission">Jutalék</label>
                            <input
                                id="commission"
                                type="number"
                                placeholder='Jutalék'
                                value={newService.commission}
                                onChange={(e) => setNewService({ ...newService, commission: e.target.value })}
                            />
                        </p>
                        <div className='services-cancel-save-buttons'>
                            <button onClick={() => {
                                setIsAddActive(false);
                                setNewService({ name: '', type: '', price: '', commission: '' });
                            }} className="services-btn">Mégse</button>
                            <button onClick={() => handleAdd()} className="services-btn">Hozzáadás</button>
                        </div>
                    </div>

                </>

            )}
            {isSearchActive && (
                <>
                    <div className='services-search-dropdown'>
                        <div className='services-search-dropdown-item'>
                            <input type="text" placeholder='Keresés...' />
                        </div>
                    </div>

                </>
            )}






            {/* Szolgáltatások listázása */}
            {services.map((service, index) => (
                <div key={service.id}>
                    {/* Tab fejléc */}
                    <div
                        className={openTab === index ?
                            "services-edit-container services-container-open"
                            : "services-row-container services-container"
                        }
                        onClick={() => toggleDropdown(index)} // Dropdown kezelés
                    >
                        {/* Szerkesztési állapotban input mező jelenik meg */}
                        {editIndex === index ? (
                            <input
                                className="services-edit-input"
                                type="text"
                                value={editedService.name}
                                onChange={(e) => handleEditChange('name', e.target.value)}
                            />
                        ) : (
                            // Normál állapotban a név szövegként jelenik meg
                            <span>{service.name}</span>
                        )}

                        {/* Szerkesztés és törlés ikonok (csak normál állapotban láthatók) */}
                        {editIndex === index ? null : (
                            <div className="services-actions" onClick={(e) => e.stopPropagation()}>

                                <img
                                    className="services-remove"
                                    src={xIcon}
                                    alt="Remove icon"
                                    onClick={() => handleDelete(service.name)}
                                />
                                <img
                                    className="services-edit"
                                    src={editIcon}
                                    alt="Edit icon"
                                    onClick={(e) => {
                                        e.stopPropagation(); // Megakadályozza a dropdown automatikus kibontását
                                        handleEditClick(index, service); // Szerkesztési mód aktiválása
                                    }}
                                />
                            </div>
                        )}
                    </div>

                    {/* Dropdown tartalom */}
                    {openTab === index && (
                        <div className="services-container services-dropdown-content">
                            {/* Típus mező */}
                            <p className="services-dropdown-item">
                                <label htmlFor="type">Típus</label>
                                {editIndex === index ? (
                                    <input
                                        className='services-edit-dropdown-input'
                                        id='type'
                                        type="text"
                                        value={editedService.type || ''}
                                        onChange={(e) => handleEditChange('type', e.target.value)}
                                    />
                                ) : (
                                    <span>{service.type}</span>
                                )}
                            </p>

                            {/* Ár mező */}
                            <p className="services-dropdown-item">
                                <label htmlFor="price">Ár</label>
                                {editIndex === index ? (
                                    <input
                                        className='services-edit-dropdown-input'
                                        id='price'
                                        type="number"
                                        value={editedService.price || ''}
                                        onChange={(e) => handleEditChange('price', e.target.value)}
                                    />
                                ) : (
                                    <span>{service.price}</span>
                                )}
                            </p>

                            {/* Jutalék mező */}
                            <p className="services-dropdown-item">
                                <label htmlFor="commission">Jutalék</label>
                                {editIndex === index ? (
                                    <input
                                        className='services-edit-dropdown-input'
                                        id='commission'
                                        type="number"
                                        value={editedService.commission || ''}
                                        onChange={(e) =>
                                            handleEditChange('commission', e.target.value)
                                        }
                                    />
                                ) : (
                                    <span>{service.commission}</span>
                                )}
                            </p>

                            {/* Mentés gomb (csak szerkesztési állapotban látható) */}
                            {editIndex === index && (
                                <div className='services-cancel-save-buttons'>
                                    <button
                                        className="services-btn"
                                        onClick={handleCancelEdit}
                                    >
                                        Mégse
                                    </button>
                                    <button
                                        className="services-btn"
                                        onClick={() => handleEditSave(service.id)}
                                    >
                                        Mentés
                                    </button>
                                </div>
                            )}

                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Services;

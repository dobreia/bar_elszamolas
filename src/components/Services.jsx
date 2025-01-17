import React, { useState } from 'react';
import xIcon from '../assets/x-icon.svg';
import editIcon from '../assets/edit-icon.png';
import '../styles/Services.css';

const Services = ({ services, setServices }) => {
    const [openTab, setOpenTab] = useState(null); // Kibontott tab indexe
    const [editIndex, setEditIndex] = useState(null); // Szerkesztési állapotot tároló index
    const [editedService, setEditedService] = useState({}); // Az aktuálisan szerkesztett adatokat tárolja

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

    // Szerkesztett adatok mentése
    const handleEditSave = (serviceId) => {
        // Frissíti a `services` listát a mentett adatokkal
        setServices((prevServices) =>
            prevServices.map((service) =>
                service.id === serviceId ? { ...service, ...editedService } : service
            )
        );
        setEditIndex(null); // Szerkesztési állapot lezárása
        setOpenTab(null); // Tab bezárása
    };
    const handleCancelEdit = () => {
        setEditedService({});
        setEditIndex(null);
    }

    return (
        <div className="services-main-content">
            {/* Új szolgáltatás hozzáadása */}
            <div className="services-new-container services-container">
                <input
                    className="services-new-input"
                    placeholder="Adj hozzá új szolgáltatást!"
                    type="text"
                />
                <button className="services-btn">Hozzáadás</button>
            </div>

            {/* Szolgáltatások listázása */}
            {services.map((service, index) => (
                <div key={service.id}>
                    {/* Tab fejléc */}
                    <div
                        className={editIndex === index
                            ? 'services-edit-container services-container' // Szerkesztési állapot stílusa
                            : 'services-row-container services-container' // Normál állapot stílusa
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
                            <div className="services-actions">
                                <img
                                    className="services-remove"
                                    src={xIcon}
                                    alt="Remove icon"
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
                                Típus:
                                {editIndex === index ? (
                                    <input
                                        className='services-edit-dropdown-input'
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
                                Ár:
                                {editIndex === index ? (
                                    <input
                                        className='services-edit-dropdown-input'
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
                                Jutalék:
                                {editIndex === index ? (
                                    <input
                                        className='services-edit-dropdown-input'
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

import React, { useState } from 'react';
import xIcon from '../assets/x-icon.svg';
import editIcon from '../assets/edit-icon.png';
import '../styles/Services.css';

const Services = ({ services }) => {
    const [openTab, setOpenTab] = useState(null);

    const toggleDropdown = (index) => {
        setOpenTab(openTab === index ? null : index)
    };

    return (
        <div className="services-main-content">
            <div className="services-new-container services-container">
                <input
                    className="services-new-input"
                    placeholder="Adj hozzá új szolgáltatást!"
                    type="text"
                />
                <button className="services-btn">Hozzáadás</button>
            </div>
            {services.map((service, index) => (
                <div>
                    <div
                        className="services-row-container services-container"
                        key={index}
                        onClick={() => toggleDropdown(index)}
                    >
                        <span>{service.name}</span>
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
                            />
                        </div>
                    </div>
                    {openTab == index && (
                        <div className="services-container services-dropdown-content">
                            <p className='services-row-container services-container services-dropdown-item'>
                                <div>Típus:<span>{service.type}</span></div>
                                <div className="services-actions">
                                    <img
                                        className="services-edit"
                                        src={editIcon}
                                        alt="Edit icon"
                                    />
                                </div>
                            </p>
                            <p className='services-row-container services-container services-dropdown-item'>
                                <div>Ár:<span>{service.price}</span></div>
                                <div className="services-actions">
                                    <img
                                        className="services-edit"
                                        src={editIcon}
                                        alt="Edit icon"
                                    />
                                </div>
                            </p>
                            <p className='services-row-container services-container services-dropdown-item'>
                                <div>Jutalék:<span>{service.commission}</span></div>
                                <div className="services-actions">
                                    <img
                                        className="services-edit"
                                        src={editIcon}
                                        alt="Edit icon"
                                    />
                                </div>
                            </p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Services;

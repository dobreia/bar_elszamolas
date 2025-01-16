import React from 'react';
import xIcon from '../assets/x-icon.svg';
import editIcon from '../assets/edit-icon.png';
import '../styles/Services.css';

const Services = ({ services }) => {

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
                <div
                    className="services-row-container services-container"
                    key={index}
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
            ))}
        </div>
    );
};

export default Services;

import React from 'react';
import '../styles/Services.css'

const Services = ({ services }) => {
    return (
        <div className='container'>
            {services.map((service, index) => (
                <div><p>{service.name}</p></div>
            ))}
        </div>
    );
};

export default Services;

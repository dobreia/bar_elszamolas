import React from 'react'

const CounterBox = ({ title, idPrefix, specificFields, commonFields }) => {
    const fields = [...specificFields[idPrefix], ...commonFields];

    return (
        <section className='counter-section'>
            <p className='counter-box-header'>{title}</p>
            <div className='counter-box'>
                {fields.map((field) => (
                    <div key={field.id} className='counter-box-item'>
                        <label htmlFor={`${idPrefix}-${field.id}`}>{field.label}</label>
                        <input id={`${idPrefix}-${field.id}`} type="number" />
                    </div>
                ))}
            </div>
        </section>
    );
}

export default CounterBox

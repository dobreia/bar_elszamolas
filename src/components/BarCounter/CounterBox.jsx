import React from 'react'

const CounterBox = ({ title, idPrefix, specificFields, commonFields, values, onChange }) => {
    const fields = [...specificFields[idPrefix], ...commonFields];

    const formatNumber = (value) => {
        if (!value) return '';
        return Number(value).toLocaleString("hu-HU"); // Magyar számformátum
    };

    const parseNumber = (value) => {
        return value.replace(/\s+/g, ''); // Eltávolítja a szóközöket
    };

    return (
        <section className='counter-section'>
            <p className='counter-box-header'>{title}</p>
            <div className='counter-box'>
                {fields.map((field) => (
                    <div key={field.id} className='counter-box-item'>
                        <label htmlFor={`${idPrefix}-${field.id}`}>{field.label}</label>
                        <input
                            id={`${idPrefix}-${field.id}`}
                            type="text" 
                            value={formatNumber(values[`${idPrefix}-${field.id}`]) || ''}
                            onChange={(e) => onChange(`${idPrefix}-${field.id}`, parseNumber(e.target.value))}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}

export default CounterBox

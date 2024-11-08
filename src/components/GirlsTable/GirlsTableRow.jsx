import React, { useState } from 'react';
import serviceData from './ServiceData';

const GirlsTableRow = ({ girl, cash, setCash, card, setCard }) => {
    const [values, setValues] = useState(
        serviceData.map(() => ({ cash: 0, card: 0 }))
    );

    const handleInputChange = (index, field, newValue) => {
        const updatedValues = [...values];
        updatedValues[index][field] = newValue === '' ? '' : parseInt(newValue, 10) || 0;
        setValues(updatedValues);

        // Az összeg kiszámítása és a megfelelő állapot frissítése a szülő komponensben
        const sum = updatedValues.reduce((acc, item) => acc + (item[field] || 0), 0);
        if (field === 'cash') {
            setCash(sum);
        } else if (field === 'card') {
            setCard(sum);
        }
    };

    return (
        <tr>
            <td>{girl}</td>
            <td className='girl-bg'>{cash}</td>
            <td className='girl-bg'>{card}</td>
            {serviceData.map((_, index) => (
                <td key={index}>
                    <input
                        type="number"
                        value={values[index].cash === 0 ? '' : values[index].cash}
                        onChange={(e) => handleInputChange(index, 'cash', e.target.value)}
                    />
                    <input
                        type="number"
                        value={values[index].card === 0 ? '' : values[index].card}
                        onChange={(e) => handleInputChange(index, 'card', e.target.value)}
                    />
                </td>
            ))}
        </tr>
    );
};

export default GirlsTableRow;

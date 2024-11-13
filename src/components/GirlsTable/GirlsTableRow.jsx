import React, { useState } from 'react';
import serviceData from '../../database/ServiceData';

const GirlsTableRow = ({ girlsName, cash, setCash, card, setCard }) => {
    const [values, setValues] = useState(
        serviceData.map(() => ({ cash: 0, card: 0 }))
    );

    const handleInputChange = (index, field, newValue) => {
        const updatedValues = [...values];
        const oldNumericValue = updatedValues[index][field];
        const numericValue = newValue === '' ? 0 : parseInt(newValue, 10) || 0;

        // Frissítjük a tárolt értékeket
        updatedValues[index][field] = numericValue;
        setValues(updatedValues);

        const servicePrice = serviceData[index].ár;
        const totalChange = numericValue * servicePrice - oldNumericValue * servicePrice;

        // Frissítjük a cash vagy card állapotot
        if (field === 'cash') {
            setCash((prevCash) => prevCash + totalChange);
        } else if (field === 'card') {
            setCard((prevCard) => prevCard + totalChange);
        }
    };

    return (
        <tr>
            <td className='girl-name'>{girlsName}</td>
            <td className='girl-bg'>0</td>
            <td className='girl-bg'>0</td>
            <td className='girl-bg'>0</td>
            {serviceData.map((_, index) => (
                <React.Fragment key={index}>
                    <td className='number-td'>
                        <input className='number-input'
                            type="number"
                            value={values[index].cash === 0 ? '' : values[index].cash}
                            onChange={(e) => handleInputChange(index, 'cash', e.target.value)}
                            onWheel={(e) => e.target.blur()}
                        />
                    </td>
                    <td className='number-td'>
                        <input className='number-input'
                            type="number"
                            value={values[index].card === 0 ? '' : values[index].card}
                            onChange={(e) => handleInputChange(index, 'card', e.target.value)}
                            onWheel={(e) => e.target.blur()}
                        />
                    </td>
                </React.Fragment>
            ))}
        </tr>
    );
};

export default GirlsTableRow;

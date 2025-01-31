import React, { useEffect, useState } from 'react';
import xIcon from '../../assets/x-icon.svg';

const GirlsTableRow = ({ girlsName, cash, setCash, card, setCard, onRemove, services }) => {
    const [values, setValues] = useState([]);

    // 🔄 Ha a `services` frissül, akkor a `values` is frissül
    useEffect(() => {
        if (services.length > 0) {
            setValues(services.map(() => ({ cash: 0, card: 0 })));
        }
    }, [services]);

    const handleInputChange = (index, field, newValue) => {
        if (!values[index]) return; // 🔴 Ha `values[index]` nem létezik, akkor ne fusson tovább
        const updatedValues = [...values];
        const oldNumericValue = updatedValues[index][field] || 0;
        const numericValue = newValue === '' ? 0 : parseInt(newValue, 10) || 0;

        updatedValues[index][field] = numericValue;
        setValues(updatedValues);

        const servicePrice = services[index]?.price || 0; // 🔹 Biztosítsuk, hogy létező adatot használjunk
        const totalChange = numericValue * servicePrice - oldNumericValue * servicePrice;

        if (field === 'cash') {
            setCash((prevCash) => prevCash + totalChange);
        } else if (field === 'card') {
            setCard((prevCard) => prevCard + totalChange);
        }
    };

    return (
        <tr className='girl-row'>
            <td>
                <div className='girl-name'>
                    <img className='remove-girl-icon' onClick={onRemove} src={xIcon} alt="" />
                    <span>{girlsName}</span>
                </div>
            </td>
            <td className='girl-bg'>0</td>
            <td className='girl-bg'>0</td>
            <td className='girl-bg'>0</td>
            {services.map((_, index) => (
                <React.Fragment key={index}>
                    <td className='number-td'>
                        <select
                            className='number-input'
                            value={values[index]?.cash === 0 ? '' : values[index]?.cash}
                            onChange={(e) => handleInputChange(index, 'cash', e.target.value)}
                            onWheel={(e) => e.target.blur()}
                            disabled={!values[index]} // 🔹 Ha nincs érték, akkor ne lehessen használni
                        >
                            <option value=""></option>
                            {[...Array(15)].map((_, i) => (
                                <option className='dropdown' key={i + 1} value={i + 1}>{i + 1}</option>
                            ))}
                        </select>
                    </td>
                    <td className='number-td'>
                        <select className='number-input'
                            value={values[index]?.card === 0 ? '' : values[index]?.card}
                            onChange={(e) => handleInputChange(index, 'card', e.target.value)}
                            onWheel={(e) => e.target.blur()}
                            disabled={!values[index]} // 🔹 Ha nincs érték, akkor ne lehessen használni
                        >
                            <option value=""></option>
                            {[...Array(15)].map((_, i) => (
                                <option className='dropdown' key={i + 1} value={i + 1}>{i + 1}</option>
                            ))}
                        </select>
                    </td>
                </React.Fragment>
            ))}
        </tr>
    );
};

export default GirlsTableRow;

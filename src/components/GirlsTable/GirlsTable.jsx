import React, { useEffect, useState } from 'react';
import GirlsTableRow from './GirlsTableRow';
import serviceData from '../../database/ServiceData';

const GirlsTable = ({ girlsName }) => {
    const [cash, setCash] = useState(0);
    const [card, setCard] = useState(0);
    const [selectedGirls, setSelectedGirls] = useState([]); // Állapot a kiválasztott lányokhoz

    const handleSelectGirl = (e) => {
        const selectedGirl = e.target.value;
        if (selectedGirl && !selectedGirls.includes(selectedGirl)) {
            setSelectedGirls(prevGirls => [...prevGirls, selectedGirl]);
        }
    };
    const removeSelectedGirl = (girlToRemove) => {
        setSelectedGirls(prevGirls => {
            return prevGirls.filter(girl => girl !== girlToRemove);
        });
    };

    const sum = card + cash;

    return (
        <div>
            <div>
                <section className='section-girl-dropdown'>
                    <p>Válassz ki egy lányt: </p>
                    <select onChange={handleSelectGirl} value="">
                        <option value="" disabled>Kiválasztás</option>
                        {girlsName.map((girl, index) => (
                            !selectedGirls.includes(girl) && (
                                <option key={index} value={girl}>
                                    {girl}
                                </option>
                            )
                        ))}
                    </select>
                </section>

                <table>
                    <thead>
                        <tr className='service-row'>
                            <th>ÖSSZ BEVÉTEL TÁNC + LÁNY ITAL</th>
                            <th rowSpan="2">{sum}</th>
                            <th rowSpan="2">{cash}</th>
                            <th rowSpan="2">{card}</th>
                            {serviceData.map((service, index) => (
                                <th key={`header-${index}`} colSpan="2">
                                    {service.név}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='cash-card-row'>
                            <td>Aktuális lányok</td>
                            <td className='girl-bg'>Összesen</td>
                            <td className='girl-bg'>Készpénz</td>
                            <td className='girl-bg'>Kártya</td>
                            {serviceData.map((_, index) => (
                                <React.Fragment key={index}>
                                    <td>Készpénz</td>
                                    <td>Kártya</td>
                                </React.Fragment>
                            ))}
                        </tr>
                        {selectedGirls.map((selectedGirl, index) => (
                            <GirlsTableRow
                                key={index}
                                girlsName={selectedGirl}
                                cash={cash} setCash={setCash}
                                card={card} setCard={setCard}
                                onRemove={() => removeSelectedGirl(selectedGirl)}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default GirlsTable;

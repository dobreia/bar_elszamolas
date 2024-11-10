import React, { useEffect, useState } from 'react';
import GirlsTableRow from './GirlsTableRow';
import serviceData from '../../database/ServiceData';


const GirlsTable = ({ girlsName }) => {
    const [cash, setCash] = useState(0);
    const [card, setCard] = useState(0);
    const sum = card + cash;


    return (
        <div>
            <div>
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
                        {girlsName.map((girlsName, index) => (
                            <GirlsTableRow
                                key={index}
                                girlsName={girlsName}
                                cash={cash} setCash={setCash}
                                card={card} setCard={setCard}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default GirlsTable;

import React, { useState } from 'react';
import GirlsTableRow from './GirlsTableRow';
import girlsData from './GirlsData';
import serviceData from './ServiceData';

const GirlsTable = () => {
    const [cash, setCash] = useState(0);
    const [card, setCard] = useState(0);

    // Összeg kiszámítása az aktuális állapotok alapján
    const sum = cash + card;

    return (
        <div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th rowSpan="2">ÖSSZ BEVÉTEL TÁNC + LÁNY ITAL</th>
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
                        <tr>
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
                        {girlsData.map((girl, index) => (
                            <GirlsTableRow
                                key={index}
                                girl={girl}
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

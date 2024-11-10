import React, { useEffect, useState } from 'react';
import GirlsTableRow from './GirlsTableRow';
import serviceData from '../../database/ServiceData';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../database/firebase-config'; // Az adatbázisod konfiguráció

const GirlsTable = () => {
    const [cash, setCash] = useState(0);
    const [card, setCard] = useState(0);
    const sum = card + cash;

    const [girlsName, setGirlsName] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "girls"));
                const girlsList = querySnapshot.docs.map(doc => doc.data().name);
                setGirlsName(girlsList);
            } catch (error) {
                console.error("Hiba történt az adatok lekérése közben.", error);
            }
        };

        fetchData();
    }, []);



    return (
        <div>
            <div>
                <table>
                    <thead>
                        <tr>
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

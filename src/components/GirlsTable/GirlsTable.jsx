import React, { useEffect, useState } from 'react';
import GirlsTableRow from './GirlsTableRow';
import '../../styles/Girls.css'
import addSelectedGirl from '../../database/Girls/AddSelectedGirl';
import { collection, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../database/firebase-config';

const GirlsTable = ({ girlsName, services }) => {
    console.log("girlsName prop:", girlsName);

    const [cash, setCash] = useState(0);
    const [card, setCard] = useState(0);
    const [selectedGirls, setSelectedGirls] = useState([]); // Állapot a kiválasztott lányokhoz

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'selectedGirls'), (snapshot) => {
            const selectedGirlsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setSelectedGirls(selectedGirlsList);
        });

        return () => unsubscribe();
    }, []);

    const handleSelectGirl = (e) => {
        const selectedGirl = e.target.value;
        if (selectedGirl && !selectedGirls.some(girl => girl.name === selectedGirl)) {
            setSelectedGirls(prevGirls => [...prevGirls, selectedGirl]);
            addSelectedGirl(selectedGirl)
        }
    };

    const removeSelectedGirl = async (girlToRemove) => {
        try {
            await deleteDoc(doc(db, 'selectedGirls', girlToRemove.id));
            setSelectedGirls(prevGirls => {
                return prevGirls.filter(girl => girl.id !== girlToRemove.id);
            });
        } catch (error) {
            console.error('Hiba történt a törlés során:', error);
        }
    };
    const sum = card + cash;

    return (
        <div className='main-content'>
            <section className='section-girl-dropdown'>
                <p>Válassz ki egy lányt: </p>
                <select onChange={handleSelectGirl} value="">
                    <option value="" disabled>Kiválasztás</option>
                    {girlsName
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .filter(girl => !selectedGirls.some(selected => selected.name === girl.name))
                        .map((girl, index) => (
                            <option key={index} value={girl.name}>
                                {girl.name}
                            </option>

                        ))}
                </select>
            </section>

            <table>
                <thead>
                    <tr className='service-row'>
                        <th><p className='elso'>ÖSSZ BEVÉTEL TÁNC + LÁNY ITAL</p></th>
                        <th>{sum}</th>
                        <th>{cash}</th>
                        <th>{card}</th>
                        {services.map((service, index) => (
                            <th key={`header-${index}`} colSpan="2">
                                {service.name}
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
                        {services.map((_, index) => (
                            <React.Fragment key={index}>
                                <td>Készpénz</td>
                                <td>Kártya</td>
                            </React.Fragment>
                        ))}
                    </tr>
                    {selectedGirls.map((selectedGirl, index) => (
                        <GirlsTableRow
                            key={index}
                            girlsName={selectedGirl.name}
                            cash={cash} setCash={setCash}
                            card={card} setCard={setCard}
                            onRemove={() => removeSelectedGirl(selectedGirl)}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};


export default GirlsTable;

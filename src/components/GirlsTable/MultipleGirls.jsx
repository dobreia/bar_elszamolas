import React, { useEffect, useState } from 'react'
import updateCommissionSummary from '../../database/Summary/updateCommissionSummary';
import { collection, getDocs } from 'firebase/firestore';
import updateTransactions from '../../database/Transactions/updateTransaction';
import updateTotalSummary from '../../database/Summary/updateTotalSummary';
import { db } from '../../database/firebase-config';

const MultipleGirls = ({ girl, selectedGirls, service, onClose, onSave }) => {
    const numberOfGirls = service.number_of_girls;
    const [errorMessages, setErrorMessages] = useState(Array(numberOfGirls - 1).fill(""));
    const [inputValues, setInputValues] = useState(Array(numberOfGirls - 1).fill(""));
    const [hasErrors, setHasErrors] = useState(false);

    useEffect(() => {
        setInputValues(Array(numberOfGirls - 1).fill(""));
        setErrorMessages(Array(numberOfGirls - 1).fill(""));
        setHasErrors(false);
    }, [numberOfGirls]);


    const handleInputChange = (index, event) => {
        const { value } = event.target;

        setInputValues(prevValues => {
            const newValues = [...prevValues];
            newValues[index] = value;

            setErrorMessages(prevErrors => {
                const newErrors = [...prevErrors];
                newErrors[index] = value != "" ? "" : "A mező nem lehet üres";
                return newErrors;
            })

            setHasErrors(newValues.some(val => val === ""));

            return newValues
        });
    };

    const handleSave = async () => {
        const newErrorMessages = inputValues.map(value => value.trim() === "" ? "A mező nem lehet üres" : "");
        setErrorMessages(newErrorMessages);

        if (newErrorMessages.some(error => error !== "")) {
            setHasErrors(true);
            return;
        }

        const selectedGirlsList = [girl.name, ...inputValues];

        try {
            // Az első lány tranzakcióinak lekérése
            const firstGirl = selectedGirls.find(g => g.name === girl.name);
            if (!firstGirl) {
                console.warn("Az első kiválasztott lány nem található az adatbázisban.");
                return;
            }

            const transactionsRef = collection(db, "transactions");
            const snapshot = await getDocs(transactionsRef);

            // Az első lány aktuális tranzakcióinak kinyerése
            const firstGirlTransactions = snapshot.docs
                .map(doc => ({ id: doc.id, ...doc.data() }))
                .filter(t => t.girlID === firstGirl.id && t.serviceID === service.id);

            if (firstGirlTransactions.length === 0) {
                console.warn("Az első lánynak nincs tranzakciója.");
                return;
            }

            // Minden kiválasztott lánynak frissítjük a tranzakcióit az első lány alapján
            await Promise.all(selectedGirlsList.map(async (selectedGirlName, index) => {
                const foundGirl = selectedGirls.find(g => g.name === selectedGirlName);
                if (!foundGirl) {
                    console.warn(`Nincs ilyen lány az adatbázisban: ${selectedGirlName}`);
                    return;
                }

                // Minden egyes tranzakciót lemásolunk és frissítünk az új lánynak
                await Promise.all(firstGirlTransactions.map(async (transaction) => {
                    const isMainGirl = index === 0;
                    const field = transaction.lastModified;
                    const valueToAdd = transaction[field] ?? 0;

                    const existingTransaction = snapshot.docs.find(doc =>
                        doc.id === `${foundGirl.id}_${service.id}`
                    )?.data();


                    const currentValue = existingTransaction?.[field] ?? 0;
                    const newValue = isMainGirl ? valueToAdd : currentValue + valueToAdd;
                    await updateTransactions(
                        foundGirl.id,
                        service.id,
                        field,
                        newValue,
                        service.price,
                        service.commission,
                        isMainGirl
                    );


                }));

                // Jutalék és összesítés frissítése
                await updateCommissionSummary(foundGirl.id);
            }));

            onSave(selectedGirlsList);
            onClose();
        } catch (error) {
            console.error("Hiba a mentés során:", error);
        }
    };



    return (
        <div className='multiple-girls'>
            <p className='header'>Add meg melyik {numberOfGirls} lány tartozik a szolgáltatáshoz!</p>
            <div className='multiple-girls-items'>
                <div className='multiple-girls-item'>
                    <p className='first-girl'>1. lány neve:<span>{girl.name}</span></p>
                </div>
                {Array.from({ length: numberOfGirls - 1 }, (_, i) => (
                    <div key={i} className='multiple-girls-item'>
                        <label htmlFor={`${i + 2}girl`}>{i + 2}. lány neve:</label>
                        <select
                            id={`${i + 2}girl`}
                            value={inputValues[i]}
                            onChange={(e) => handleInputChange(i, e)}
                        >
                            <option value=""></option>
                            {selectedGirls.map((selectedGirl, index) => (
                                <option key={index} value={selectedGirl.name}>{selectedGirl.name}</option>
                            ))}
                        </select>
                        {errorMessages[i] && <p className='error-message'>{errorMessages[i]}</p>}
                    </div>
                ))}

            </div >
            <div className='multiple-girls-btn-container'>
                <button className='btn' onClick={onClose}>Mégse</button>
                <button className='btn' onClick={handleSave}>Mentés</button>
            </div>
        </div >

    )
}

export default MultipleGirls

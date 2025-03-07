import { collection, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../../database/firebase-config';

const Income = ({ counterValues, services }) => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'transactions'), (snapshot) => {
            setTransactions(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });

        return () => unsubscribe();
    }, []);

    const formatNumber = (num) => (Number(num) || 0).toLocaleString('hu-HU');

    const serviceMap = services.reduce((acc, service) => {
        acc[service.id] = service;
        return acc;
    }, {});

    // Tranzakciók szűrése szolgáltatástípus szerint
    const getTransactionsByType = (type) => {
        return transactions.filter(trx => {
            const service = serviceMap[trx.serviceID]; // 🔹 Közvetlen elérés az objectből (O(1) idő)
            return service && service.type === type;
        });
    };

    // Táncos tranzakciók összesítése
    const danceTransactions = getTransactionsByType("tánc");
    const drinkTransactions = getTransactionsByType("lány italok");
    const champagneTransactions = getTransactionsByType("pezsgő");
    const packageTransactions = getTransactionsByType("csomag");


    const danceCard = danceTransactions.reduce((acc, trx) => {
        const service = services.find(s => s.id === trx.serviceID);
        return acc + ((parseFloat(trx.card) || 0) * (service?.price || 0));
    }, 0);

    const danceCash = danceTransactions.reduce((acc, trx) => {
        const service = services.find(s => s.id === trx.serviceID);
        return acc + ((parseFloat(trx.cash) || 0) * (service?.price || 0));
    }, 0);

    const danceTotal = danceCard + danceCash;

    const drinkCard = drinkTransactions.reduce((acc, trx) => {
        const service = services.find(s => s.id === trx.serviceID);
        return acc + ((parseFloat(trx.card) || 0) * (service?.price || 0));
    }, 0);

    const drinkCash = drinkTransactions.reduce((acc, trx) => {
        const service = services.find(s => s.id === trx.serviceID);
        return acc + ((parseFloat(trx.cash) || 0) * (service?.price || 0));
    }, 0);
    const drinkTotal = drinkCard + drinkCash;

    const champagneCard = champagneTransactions.reduce((acc, trx) => {
        const service = services.find(s => s.id === trx.serviceID);
        return acc + ((parseFloat(trx.card) || 0) * (service?.price || 0));
    }, 0);

    const champagneCash = champagneTransactions.reduce((acc, trx) => {
        const service = services.find(s => s.id === trx.serviceID);
        return acc + ((parseFloat(trx.cash) || 0) * (service?.price || 0));
    }, 0);
    const champagneTotal = champagneCard + champagneCash;

    const packageCard = packageTransactions.reduce((acc, trx) => {
        const service = services.find(s => s.id === trx.serviceID);
        return acc + ((parseFloat(trx.card) || 0) * (service?.price || 0));
    }, 0);

    const packageCash = packageTransactions.reduce((acc, trx) => {
        const service = services.find(s => s.id === trx.serviceID);
        return acc + ((parseFloat(trx.cash) || 0) * (service?.price || 0));
    }, 0);
    const packageTotal = packageCard + packageCash;

    const servicesCardTotal = danceCard + drinkCard + champagneCard + packageCard;
    const servicesCashTotal = danceCash + drinkCash + champagneCash + packageCash;


    const lowerBarCard = ((Number(counterValues["lower-POS-LowerBar"]) || 0) + (Number(counterValues["lower-POS-LowerArea"]) || 0));
    const lowerBarCash = ((Number(counterValues["lower-ForeignCurrencyCash"]) || 0) + (Number(counterValues["lower-Cash"]) || 0));
    const lowerBarTotal = lowerBarCard + lowerBarCash;

    const upperBarCard = ((Number(counterValues["upper-POS-Upper"]) || 0));
    const upperBarCash = ((Number(counterValues["upper-ForeignCurrencyCash"]) || 0) + (Number(counterValues["upper-Cash"]) || 0));
    const upperBarTotal = upperBarCard + upperBarCash;



    return (
        <div className='closing-main-content'>
            <h1>Bevétel</h1>
            <table className='closing-table'>
                <thead>
                    <tr>
                        <th></th>
                        <th>KÁRTYA</th>
                        <th>KÉSZPÉNZ</th>
                        <th>TOTAL</th>
                    </tr>
                </thead>
                <tbody>
                    <tr >
                        <td className='first-column'>Tánc</td>
                        <td>{danceCard} Ft</td>
                        <td>{danceCash} Ft</td>
                        <td>{danceTotal} Ft</td>
                    </tr>
                    <tr>
                        <td className='first-column'>Lány italok</td>
                        <td>{drinkCard} Ft</td>
                        <td>{drinkCash} Ft</td>
                        <td>{drinkTotal} Ft</td>
                    </tr>
                    <tr>
                        <td className='first-column'>Pezsgő</td>
                        <td>{champagneCard} Ft</td>
                        <td>{champagneCash} Ft</td>
                        <td>{champagneTotal} Ft</td>
                    </tr>
                    <tr>
                        <td className='first-column'>Csomag</td>
                        <td>{packageCard} Ft</td>
                        <td>{packageCash} Ft</td>
                        <td>{packageTotal} Ft</td>
                    </tr>
                    <tr className='yellow'>
                        <td className='first-column'>Minden tánc program (tánc + ital)</td>
                        <td>{servicesCardTotal} Ft</td>
                        <td>{servicesCashTotal} Ft</td>
                        <td>{servicesCardTotal + servicesCashTotal}</td>
                    </tr>
                    <tr>
                        <td className='first-column'>Pult LENT</td>
                        <td>{formatNumber(lowerBarCard)} Ft</td>
                        <td>{formatNumber(lowerBarCash)} Ft</td>
                        <td>{formatNumber(lowerBarTotal)} Ft</td>
                    </tr>
                    <tr>
                        <td className='first-column'>Pult FENT</td>
                        <td>{formatNumber(upperBarCard)} Ft</td>
                        <td>{formatNumber(upperBarCash)} Ft</td>
                        <td>{formatNumber(upperBarTotal)} Ft</td>
                    </tr>
                    <tr className='bold-first'>
                        <td className='first-column'>Minden pult bevétel</td>
                        <td>{formatNumber(lowerBarTotal + upperBarTotal)}Ft</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr className='bold'>
                        <td className='first-column'>Minden bevétel</td>
                        <td>0 Ft</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr className='bold'>
                        <td className='first-column'>Totál KP</td>
                        <td></td>
                        <td>0 Ft</td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Income

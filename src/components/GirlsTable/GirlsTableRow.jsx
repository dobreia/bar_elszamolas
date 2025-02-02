import React, { useEffect, useState } from 'react';
import { collection, doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../database/firebase-config';
import updateTransaction from '../../database/Transactions/updateTransaction';
import xIcon from '../../assets/x-icon.svg';
import updateTotalSummary from '../../database/Summary/updateTotalSummary';
import updateCommissionSummary from '../../database/Summary/updateCommissionSummary';

const GirlsTableRow = ({ girlID, girlsName, cash, setCash, card, setCard, onRemove, services }) => {
    const [values, setValues] = useState([]);
    const [commissionCash, setCommissionCash] = useState(0);
    const [commissionCard, setCommissionCard] = useState(0);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "transactions"), (snapshot) => {
            const transactionList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

            setValues(services.map(service => {
                const transaction = transactionList.find(t => t.girlID === girlID && t.serviceID === service.id);
                return transaction ?
                    { cash: transaction.cash ?? 0, card: transaction.card ?? 0 } :
                    { cash: "", card: "" };
            }));
        });
        const unsubscribeCommissions = onSnapshot(doc(db, "commissions", `girl${girlID}`), (docSnap) => {
            if (docSnap.exists()) {
                const data = docSnap.data();
                setCommissionCash(data.commission_cash || 0);
                setCommissionCard(data.commission_card || 0);
            }
        });

        return () => {
            unsubscribe();
            unsubscribeCommissions();
        }


    }, [services, girlID]);

    const handleInputChange = async (index, field, newValue) => {
        if (!values[index]) return;

        const updatedValues = [...values];
        const oldNumericValue = updatedValues[index][field] || 0;
        const numericValue = newValue === '' ? "" : parseInt(newValue, 10) || "";

        updatedValues[index][field] = numericValue;
        setValues(updatedValues);

        const servicePrice = services[index]?.price || 0;
        const serviceCommission = services[index]?.commission || 0;
        const totalPriceChange = (numericValue || 0) * servicePrice - oldNumericValue * servicePrice;
        const totalCommissionChange = (numericValue || 0) * serviceCommission - oldNumericValue * serviceCommission;


        if (field === 'cash') {
            setCash((prevCash) => prevCash + totalPriceChange);
            setCommissionCash((prevCommissionCash) => prevCommissionCash + totalCommissionChange)
        } else if (field === 'card') {
            setCard((prevCard) => prevCard + totalPriceChange);
            setCommissionCard((prevCommissionCard) => prevCommissionCard + totalCommissionChange)
        }

        // Adatok mentése Firestore-ba
        await updateTransaction(girlID, services[index].id, field, numericValue || 0);
        await updateTotalSummary(services);
        await updateCommissionSummary(girlID, services);
    };
    const commissionTotal = commissionCard + commissionCash
    return (
        <tr className='girl-row'>
            <td>
                <div className='girl-name'>
                    <img className='remove-girl-icon' onClick={onRemove} src={xIcon} alt="" />
                    <span>{girlsName}</span>
                </div>
            </td>
            <td className='girl-bg'>{commissionTotal.toLocaleString('hu-HU')}</td>
            <td className='girl-bg'>{commissionCash.toLocaleString('hu-HU')}</td>
            <td className='girl-bg'>{commissionCard.toLocaleString('hu-HU')}</td>
            {services.map((service, index) => (
                <React.Fragment key={service.id}>
                    <td className='number-td'>
                        <select
                            className='number-input'
                            value={values[index]?.cash}
                            onChange={(e) => handleInputChange(index, 'cash', e.target.value)}
                            onWheel={(e) => e.target.blur()}
                        >
                            <option value=""></option>
                            {[...Array(15)].map((_, i) => (
                                <option className='dropdown' key={i + 1} value={i + 1}>{i + 1}</option>
                            ))}
                        </select>
                    </td>
                    <td className='number-td'>
                        <select className='number-input'
                            value={values[index]?.card}
                            onChange={(e) => handleInputChange(index, 'card', e.target.value)}
                            onWheel={(e) => e.target.blur()}
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

import React, { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../database/firebase-config';
import '../../styles/Closing.css';
import Income from './Income';
import Expense from './Expense';
import Summary from './Summary';
import Result from './Result';

const Closing = ({ counterValues, services }) => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'transactions'), (snapshot) => {
            setTransactions(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });

        return () => unsubscribe();
    }, []);
    return (
        <div className='closing-main-content'>
            <Income counterValues={counterValues} transactions={transactions} services={services} />
            <Expense />
            <Summary />
            <Result />
            <div className='closing-main-content footer'>
                <div className='number-of-guests'>
                    <label htmlFor="numberOfGuests">Vendégek száma:</label>
                    <input type="number" name='numberOfGuests' />
                </div>
                <button>Zárás!</button>
            </div>
        </div>
    )
}

export default Closing

import React from 'react';
import '../../styles/Closing.css';
import Income from './Income';
import Expense from './Expense';
import Summary from './Summary';
import Result from './Result';

const Closing = () => {
    return (
        <div className='closing-main-content'>
            <Income />
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

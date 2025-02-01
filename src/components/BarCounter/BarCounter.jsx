import React from 'react'
import '../../styles/BarCounter.css'
import CounterBox from './CounterBox';

const commonFields = [
    { id: 'openingCashRegister', label: 'Kassza nyitó' },
    { id: 'CashRegisterClosing', label: 'Pénztárgép záró' },
    { id: 'SalesReport', label: 'Forgalmi jelentés' },
    { id: 'ComplimentaryItems', label: 'Reprezentáció' },
    { id: 'Adjustment', label: 'Korrekció' },
    { id: 'E-systemClosing', label: 'E-system záró' },
    { id: 'Cash', label: 'Készpénz' },
    { id: 'ForeignCurrencyCash', label: 'Valuta készpénz' },
    { id: 'EndOfDayCashCount', label: 'Kassza záró' },
    { id: 'CardTips', label: 'Kártyás borravaló' }
];

const specificFields = {
    lower: [
        { id: 'POS-LowerBar', label: 'POS-lent pult' },
        { id: 'POS-LowerArea', label: 'POS-lent pálya' }
    ],
    upper: [
        { id: 'POS-Dance', label: 'POS-tánc' },
        { id: 'POS-Upper', label: 'POS-fent' }
    ]
};

const BarCounter = () => {
    return (
        <div className='counter-container'>
            <CounterBox title="Lenti pult" idPrefix="lower" commonFields={commonFields} specificFields={specificFields} />
            <CounterBox title="Fenti pult" idPrefix="upper" commonFields={commonFields} specificFields={specificFields} />
        </div>
    )
}

export default BarCounter

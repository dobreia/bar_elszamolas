import React from 'react'

const Income = ({ counterValues  }) => {
    const formatNumber = (num) => (Number(num) || 0).toLocaleString('hu-HU');

    const lowerBarCard = ((Number(counterValues["lower-POS-LowerBar"]) || 0) + (Number(counterValues["lower-POS-LowerArea"]) || 0));
    const lowerBarCash = ((Number(counterValues["lower-ForeignCurrencyCash"]) || 0) + (Number(counterValues["lower-Cash"]) || 0));
    const sumLowerBar = lowerBarCard + lowerBarCash;

    const upperBarCard = ((Number(counterValues["upper-POS-Upper"]) || 0));
    const upperBarCash = ((Number(counterValues["upper-ForeignCurrencyCash"]) || 0) + (Number(counterValues["upper-Cash"]) || 0));
    const sumUpperBar = upperBarCard + upperBarCash;
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
                        <td>0 Ft</td>
                        <td>0 Ft</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td className='first-column'>Lány italok</td>
                        <td>0 Ft</td>
                        <td>0 Ft</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td className='first-column'>Pezsgő</td>
                        <td>0 Ft</td>
                        <td>0 Ft</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td className='first-column'>Csomag</td>
                        <td>0 Ft</td>
                        <td>0 Ft</td>
                        <td></td>
                    </tr>
                    <tr className='yellow'>
                        <td className='first-column'>Minden tánc program (tánc + ital)</td>
                        <td>0 Ft</td>
                        <td>0 Ft</td>
                        <td>0 Ft</td>
                    </tr>
                    <tr>
                        <td className='first-column'>Pult LENT</td>
                        <td>{formatNumber(lowerBarCard)} Ft</td>
                        <td>{formatNumber(lowerBarCash)} Ft</td>
                        <td>{formatNumber(sumLowerBar)} Ft</td>
                    </tr>
                    <tr>
                        <td className='first-column'>Pult FENT</td>
                        <td>{formatNumber(upperBarCard)} Ft</td>
                        <td>{formatNumber(upperBarCash)} Ft</td>
                        <td>{formatNumber(sumUpperBar)} Ft</td>
                    </tr>
                    <tr className='bold-first'>
                        <td className='first-column'>Minden pult bevétel</td>
                        <td>{formatNumber(sumLowerBar + sumUpperBar)}Ft</td>
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

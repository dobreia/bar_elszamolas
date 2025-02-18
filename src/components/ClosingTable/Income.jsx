import React from 'react'

const Income = () => {
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
                        <td>0 Ft</td>
                        <td>0 Ft</td>
                        <td>0 Ft</td>
                    </tr>
                    <tr>
                        <td className='first-column'>Pult FENT</td>
                        <td>0 Ft</td>
                        <td>0 Ft</td>
                        <td>0 Ft</td>
                    </tr>
                    <tr className='bold-first'>
                        <td className='first-column'>Minden pult bevétel</td>
                        <td>0 Ft</td>
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

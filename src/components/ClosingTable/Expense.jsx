import React from 'react'

const Expense = () => {
    return (
        <div className='closing-main-content'>
            <h1>Kiadás</h1>
            <table className='closing-table'>
                <thead>
                    <tr>
                        <th></th>
                        <th>KÁRTYA</th>
                        <th>KÉSZPÉNZ</th>
                        <th>UTALÁS</th>
                    </tr>
                </thead>
                <tbody>
                    <tr >
                        <td className='first-column'>Pultosok</td>
                        <td></td>
                        <td></td>
                        <td>0 Ft</td>
                    </tr>
                    <tr>
                        <td className='first-column'>Lányok készpénz</td>
                        <td></td>
                        <td>0 Ft</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td className='first-column'>Lányok kártya</td>
                        <td>0 Ft</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td className='first-column'>Lányok kiegészítés</td>
                        <td></td>
                        <td>0 Ft</td>
                        <td></td>
                    </tr>
                    <tr className='yellow'>
                        <td className='first-column'>Porta</td>
                        <td></td>
                        <td></td>
                        <td>0 Ft</td>
                    </tr>
                    <tr>
                        <td className='first-column'>Recepció</td>
                        <td></td>
                        <td></td>
                        <td>0 Ft</td>
                    </tr>
                    <tr>
                        <td className='first-column'>Go-GO</td>
                        <td></td>
                        <td>0 Ft</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td className='first-column'>Katica</td>
                        <td></td>
                        <td></td>
                        <td>0 Ft</td>
                    </tr>
                    <tr>
                        <td className='first-column'>Egyéb</td>
                        <td>0 Ft</td>
                        <td>0 Ft</td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Expense

import React from 'react'

const Summary = () => {
    return (
        <div className='closing-main-content'>
            <h1>Összesen</h1>
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
                    <tr className='bold'>
                        <td className='first-column'>Bevétel</td>
                        <td>0 Ft</td>
                        <td>0 Ft</td>
                        <td>0 Ft</td>
                    </tr>
                    <tr className='bold'>
                        <td className='first-column'>Kiadás</td>
                        <td>0 Ft</td>
                        <td>0 Ft</td>
                        <td>0 Ft</td>
                    </tr>
                </tbody>
            </table>
        </div >
    )
}

export default Summary

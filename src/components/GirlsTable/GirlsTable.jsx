import React from 'react'

import GirlsTableRow from './GirlsTableRow';
import girlsData from './GirlsData';
import serviceData from './ServiceData';

const GirlsTable = () => {
    return (

        <div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>ÖSSZ BEVÉTEL TÁNC + LÁNY ITAL</th>
                            <th>kartya + keszpenz</th>
                            <th>keszpenz</th>
                            <th>kartya</th>

                            {serviceData.map((service, index) => (
                                <th key={index}>
                                    {service.név}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Aktuális lányok</td>
                            <td>Összesen</td>
                            <td>Készpénz</td>
                            <td>Kártya</td>
                        </tr>
                        {girlsData.map((girl, index) => (
                            <GirlsTableRow key={index} girl={girl} />
                        ))}

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default GirlsTable

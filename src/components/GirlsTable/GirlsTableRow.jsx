import React from 'react';
import serviceData from './ServiceData';

const GirlsTableRow = ({ girl }) => {
    // Ide jöhetnek a dinamikus értékek vagy statikus cellák
    return (
        <tr>
            <td>{girl}</td>
            <td>0</td> {/* Kartya + keszpenz helykitöltő érték */}
            <td>0</td> {/* Keszpenz helykitöltő érték */}
            <td>0</td> {/* Kartya helykitöltő érték */}
            {/* Itt bővítheted a cellákat további adatokkal a serviceData alapján */}
            {Array(serviceData.length).fill(0).map((value, index) => (
                <td key={index}>{value}</td> /* Helykitöltő érték minden szolgáltatás oszlophoz */
            ))}
        </tr>
    );
};

export default GirlsTableRow;

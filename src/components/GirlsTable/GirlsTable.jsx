import React from 'react'

import GirlsTableRow from './GirlsTableRow';

const GirlsTable = () => {
    const girlsData = [
        "(ALEX) Bereczky Beatrix",
        "(ANDIKA) Szabó Andrea",
        "(BETTI) Gloncziné Somogyi Beátrix",
        "(BJUN) Szajkó Fanni Mária",
        "(FANNI) Béres Andrásné Horváth Katalin",
        "(LETTI) Mátyus Renáta",
        "(MARY) Bálint Mária",
        "(NEFELY) Törökné Király Adrienn",
        "(RAMÓNA) Tóth Tünde Róza",
        "(ROXI) Bordás Roxána",
        "(SARAH) Dudu Mercédesz Kitti",
        "(SZANDRA) Lauferné Kozák Szimonetta",
        "(VIVIEN) Szabó Tünde",
        "(ZARA) Farkas Zsófia",
        "Babóth Luca",
        "Bacsa Tifani Viktória",
        "Bán Cintia",
        "Berkesi Tímea",
        "Bognár Olivia Boglárka",
        "Botos Edit Ilona",
        "Czirfusz Vivien",
        "Csécsei Krisztina",
        "Csonka Kitti Klaudia",
        "Dér Zsófia",
        "Dobai Violetta",
        "Erdélyi Enikő",
        "Fenyvesi Vivien",
        "Gáll Kitti",
        "Gönczi Brigitta",
        "Horesta Glória Noémi",
        "Horvath Csilla",
        "Jusztin Mirabel",
        "Kállai Alexandra Melitta",
        "Kánya Bernadett",
        "Keczán Mariann",
        "Keve Henriett",
        "Király Frida Ivána",
        "Kopasz Klaudia Gerda",
        "Kovács Anna Viktória",
        "Lajos Abigél",
        "Lendvai Adrienn",
        "Meluzsin Regina",
        "Östör Vanessza Viktória",
        "Pásztor Réka Rebeka",
        "Radics Anasztázia",
        "Radics Vivien Margit",
        "Szalai Szimonetta Klaudia",
        "Török Leila Éva",
        "Veres Eliza",
        "Vlaszák Manda",
        "Zólyomi Tamara",
        "(NIKA) Vasvári Ágnes Mónika",
        "Papp Krisztina Melinda",
        "Pap Vivien"
    ];

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

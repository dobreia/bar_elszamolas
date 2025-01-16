/*import { db } from './firebase-config';
import { collection, setDoc, doc } from 'firebase/firestore';
import girlsData from './GirlsData';
const uploadGirlsData = async () => {
    try {
        const collectionRef = collection(db, "girls");

        let counter = 1; // Szám alapú ID kezdőértéke
        for (const girl of girlsData) {
            const docRef = doc(collectionRef, counter.toString()); // Szám alapú ID használata
            await setDoc(docRef, { name: girl });
            counter++; // Növeljük az ID-t
        }

        console.log("Adatok sikeresen feltöltve!");
    } catch (error) {
        console.error("Hiba történt az adatok feltöltése közben:", error);
    }
};

uploadGirlsData();*/

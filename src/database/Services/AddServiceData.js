import { db } from '../firebase-config';
import { collection, setDoc, doc } from 'firebase/firestore';
import serviceData from './ServiceData';
const uploadServiceData = async () => {
    try {
        const collectionRef = collection(db, "services");

        let counter = 1; // Szám alapú ID kezdőértéke
        for (const service of serviceData) {
            // Számozás formázása: 2 számjegy, nullákkal kiegészítve
            const formattedCounter = counter.toString().padStart(2, '0');
            const docRef = doc(collectionRef, formattedCounter); // Formázott ID használata
            await setDoc(docRef, {
                name: service.név,
                type: service.tipus,
                price: service.ár,
                commission: service.jutalék
            });
            counter++; // Növeljük az ID-t
        }

        console.log("Adatok sikeresen feltöltve!");
    } catch (error) {
        console.error("Hiba történt az adatok feltöltése közben:", error);
    }
};

uploadServiceData();

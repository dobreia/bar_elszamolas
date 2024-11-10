import { db } from './firebase-config';
import { collection, setDoc, doc } from 'firebase/firestore';
import girlsData from './GirlsData';
const addGirlsData = async () => {
    try {
        const collectionRef = collection(db, "girls");

        for (const girl of girlsData) {
            // Használj egyedi azonosítót (pl. a lány neve alapján)
            const docRef = doc(collectionRef, girl);
            await setDoc(docRef, { name: girl }); // Ha már létezik, frissíti, ha nem, létrehozza
        }
        console.log("Adatok sikeresen hozzáadva/frissítve!");
    } catch (error) {
        console.error("Hiba történt az adatok hozzáadása közben:", error);
    }
};

export default addGirlsData
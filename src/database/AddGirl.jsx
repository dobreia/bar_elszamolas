import { setDoc, doc, collection } from 'firebase/firestore';
import { db } from './firebase-config';

const addGirl = async (girlName) => {
    try {
        await setDoc(doc(collection(db, "girls")), { name: girlName });
        console.log("Lány hozzáadva az adatbázishoz:", girlName);
    } catch (error) {
        console.error("Lány hozzáadása sikertelen");
    }
}

export default addGirl
import { doc,setDoc, collection } from 'firebase/firestore';
import { db } from './firebase-config';

const addGirl = async (girlName) => {
    try {
        await setDoc(doc(collection(db, "girls")), { name: girlName });
    } catch (error) {
        console.error("Lány hozzáadása sikertelen");
    }
}

export default addGirl
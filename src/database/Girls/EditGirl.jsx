import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase-config';

const EditGirl = async (girlID, newData) => {
    try {
        const docRef = doc(db, 'girls', girlID);
        await updateDoc(docRef, newData);
    } catch (error) {
        console.error("Hiba történt a lány adatainak frissítése során:", error);
    }
};

export default EditGirl;

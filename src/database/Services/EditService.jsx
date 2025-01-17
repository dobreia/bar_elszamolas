import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase-config';

const EditService = async (serviceID, newData) => {
    try {
        const docRef = doc(db, 'services', serviceID);
        await updateDoc(docRef, newData);
    } catch (error) {
        console.error("Hiba történt a szolgáltatás adatainak frissítése során:", error);
    }
};

export default EditService;

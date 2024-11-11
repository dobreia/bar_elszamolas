import { deleteDoc, doc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from './firebase-config'; // Az adatbázis konfigurációd helye

const deleteGirl = async (girlName) => {
    try {
        // Keresés név alapján
        const q = query(collection(db, 'girls'), where('name', '==', girlName));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            // Ha megtaláljuk, töröljük az első találatot (vagy az összes egyezést iterációval kezelheted)
            const docId = querySnapshot.docs[0].id;
            await deleteDoc(doc(db, 'girls', docId));
            console.log('Lány sikeresen törölve');
        } else {
            console.log('Nem található ilyen nevű lány az adatbázisban');
        }
    } catch (error) {
        console.error('Lány törlése sikertelen', error);
    }
};

export default deleteGirl;

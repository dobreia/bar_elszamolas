import { deleteDoc, doc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase-config'; // Az adatbázis konfigurációd helye

const deleteService = async (serviceName) => {
    try {
        // Keresés név alapján
        const q = query(collection(db, 'services'), where('name', '==', serviceName));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            // Végigmegyünk az összes találaton, és töröljük őket
            querySnapshot.forEach(async (document) => {
                const docId = document.id; // Számalapú id
                await deleteDoc(doc(db, 'services', docId));
            });
            console.log('Szolgáltatás sikeresen törölve');
        } else {
            console.log('Nem található ilyen nevű szolgáltatás az adatbázisban');
        }
    } catch (error) {
        console.error('Szolgáltatás törlése sikertelen', error);
    }
};

export default deleteService;

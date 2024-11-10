import { db } from './firebase-config'; // Az adatbázis konfigurációja
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

const deleteDuplicateGirls = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "girls"));
        const allDocs = querySnapshot.docs;

        // Iterálj az összes dokumentumon
        for (let i = 0; i < allDocs.length; i++) {
            const docRef = doc(db, "girls", allDocs[i].id);
            await deleteDoc(docRef); // Törlés
        }
        console.log("Az összes dokumentum sikeresen törölve.");
    } catch (error) {
        console.error("Hiba történt a dokumentumok törlése közben:", error);
    }
};

export default deleteDuplicateGirls

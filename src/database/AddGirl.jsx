import { doc, setDoc, collection, getDocs } from 'firebase/firestore';
import { db } from './firebase-config';

const addGirl = async (girlName) => {
    try {
        const collectionRef = collection(db, "girls");
        const snapshot = await getDocs(collectionRef);
        let maxId = 0;

        // Átfut az összes meglévő dokumentumon és megtalálja a legmagasabb numerikus ID-t
        snapshot.forEach((doc) => {
            const id = parseInt(doc.id, 10);
            if (!isNaN(id) && id > maxId) {
                maxId = id;
            }
        });

        const newId = (maxId + 1).toString(); // Következő ID számként (stringként) meghatározva

        // Új dokumentum hozzáadása a kiszámított ID-val
        await setDoc(doc(collectionRef, newId), { name: girlName });
        console.log("Lány sikeresen hozzáadva, új ID:", newId);
    } catch (error) {
        console.error("Lány hozzáadása sikertelen:", error);
    }
}

export default addGirl;

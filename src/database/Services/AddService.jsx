import { doc, setDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase-config';

const addService = async (serviceName, serviceType, servicePrice, serviceCommission) => {
    try {
        const collectionRef = collection(db, "services");
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
        await setDoc(doc(collectionRef, newId), {
            name: serviceName,
            type: serviceType,
            price: servicePrice,
            commission: serviceCommission
        });
        console.log("Szolgáltatás sikeresen hozzáadva, új ID:", newId);
    } catch (error) {
        console.error("Szolgáltatás hozzáadása sikertelen:", error);
    }
}

export default addService;

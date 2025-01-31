import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase-config';

const EditService = async (serviceID, serviceName, serviceType, servicePrice, serviceCommission) => {
    try {
        const docRef = doc(db, 'services', serviceID);

        await updateDoc(docRef, {
            name: serviceName,
            type: serviceType,
            price: Number(servicePrice), // Számként tároljuk
            commission: Number(serviceCommission) // Számként tároljuk
        });

        console.log(`Szolgáltatás (${serviceID}) sikeresen frissítve!`);
    } catch (error) {
        console.error("Hiba történt a szolgáltatás adatainak frissítése során:", error);
    }
};

export default EditService;

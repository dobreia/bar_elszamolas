import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase-config";

const updateTransactions = async (girlID, serviceID, field, value) => {
    try {
        const transactionRef = doc(db, "transactions", `${girlID}_${serviceID}`);

        await setDoc(transactionRef, {
            girlID,
            serviceID,
            [field]: value
        }, { merge: true });

        console.log(`Adat frissítve: ${girlID} - ${serviceID} (${field}: ${value})`);
    } catch (error) {
        console.error("Hiba az adatok frissítésekor", error);
    }
};

export default updateTransactions
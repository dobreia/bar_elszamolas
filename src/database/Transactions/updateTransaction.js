import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase-config";

const updateTransactions = async (girlID, serviceID, field, value, servicePrice, serviceCommission) => {
    try {
        const transactionRef = doc(db, "transactions", `${girlID}_${serviceID}`);

        await setDoc(transactionRef, {
            girlID,
            serviceID,
            [field]: value,
            servicePrice,
            serviceCommission,
            lastModified: field
        }, { merge: true });

    } catch (error) {
        console.error("Hiba az adatok frissítésekor", error);
    }
};

export default updateTransactions;

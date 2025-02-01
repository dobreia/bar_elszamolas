import { doc, setDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";

const updateTotalSummary = async (services) => {
    try {
        const transactionRef = collection(db, "transactions");
        const snapshot = await getDocs(transactionRef);

        // Összegzés kiszámítása
        let totalCash = 0;
        let totalCard = 0;

        snapshot.docs.forEach(doc => {
            const data = doc.data();
            const service = services.find(service => service.id === data.serviceID);

            if (service) {
                totalCash += (data.cash || 0) * service.price;
                totalCard += (data.card || 0) * service.price;
            }
        });

        const totalSum = totalCash + totalCard;

        // Firestore frissítés
        await setDoc(doc(db, "totalSummary", "01"), {
            total_cash: totalCash,
            total_card: totalCard,
            total_sum: totalSum
        }, { merge: true });

        console.log(`Összeg frissítve - Cash: ${totalCash}, Card: ${totalCard}, Sum: ${totalSum}`);
    } catch (error) {
        console.error("Hiba az összegzés frissítésénél:", error);
    }
};

export default updateTotalSummary;

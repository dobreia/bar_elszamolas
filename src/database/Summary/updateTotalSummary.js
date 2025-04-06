import { doc, setDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";

const updateTotalSummary = async (service) => {
    try {
        const transactionRef = collection(db, "transactions");
        const snapshot = await getDocs(transactionRef);

        // Összegzés kiszámítása
        let totalCash = 0;
        let totalCard = 0;

        snapshot.docs.forEach(doc => {
            const data = doc.data();
            if (data.isCounted) {
                const price = data.servicePrice || 0;
                totalCash += (data.cash || 0) * price;
                totalCard += (data.card || 0) * price;
            }
        });

        const totalSum = totalCash + totalCard;

        // Firestore frissítés
        await setDoc(doc(db, "totalSummary", "01"), {
            total_cash: totalCash,
            total_card: totalCard,
            total_sum: totalSum
        }, { merge: true });

    } catch (error) {
        console.error("Hiba az összegzés frissítésénél:", error);
    }
};

export default updateTotalSummary;

import { doc, setDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";

const updateTotalSummary = async () => {
    try {
        const commissionSummaryRef = collection(db, "commissionSummary");
        const snapshot = await getDocs(commissionSummaryRef);

        // Összegzés kiszámítása
        const totalCash = snapshot.docs.reduce((sum, doc) => sum + (doc.data().total_cash || 0), 0);
        const totalCard = snapshot.docs.reduce((sum, doc) => sum + (doc.data().total_card || 0), 0);
        const totalSum = totalCash + totalCard;

        // Firestore frissítés
        await setDoc(doc(db, "totalSummary", "global"), {
            total_cash: totalCash,
            total_card: totalCard,
            total_sum: totalSum
        }, { merge: true });

        console.log(`Globális összeg frissítve - Cash: ${totalCash}, Card: ${totalCard}, Sum: ${totalSum}`);
    } catch (error) {
        console.error("Hiba a globális összegzés frissítésénél:", error);
    }
};

export default updateTotalSummary;

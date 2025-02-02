import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../firebase-config";

const updateCommissionSummary = async (girlID, services) => {
    try {
        const transactionRef = collection(db, "transactions");
        const snapshot = await getDocs(transactionRef);

        // Összegzés kiszámítása
        let commissionCash = 0;
        let commissionCard = 0;

        snapshot.docs.forEach(doc => {
            const data = doc.data();
            if (data.girlID === girlID) {
                const service = services.find(service => service.id === data.serviceID);
                if (service) {
                    commissionCash += (data.cash || 0) * service.commission;
                    commissionCard += (data.card || 0) * service.commission;
                }
            }

        });

        const commissionSum = commissionCash + commissionCard;

        // Firestore frissítés
        await setDoc(doc(db, "commissions", `girl${girlID}`), {
            commission_cash: commissionCash,
            commission_card: commissionCard,
            commission_sum: commissionSum
        }, { merge: true });

        console.log(`Összeg frissítve - ${girlID}: Cash: ${commissionCash}, Card: ${commissionCard}, Sum: ${commissionSum}`);
    } catch (error) {
        console.error("Hiba az összegzés frissítésénél:", error);
    }
};

export default updateCommissionSummary;
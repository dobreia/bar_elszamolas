import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../firebase-config";

const updateCommissionSummary = async (girlID) => {
    try {
        const transactionRef = collection(db, "transactions");
        const snapshot = await getDocs(transactionRef);

        let commissionCash = 0;
        let commissionCard = 0;

        snapshot.docs.forEach(doc => {
            const data = doc.data();
            if (data.girlID === girlID) {
                const commission = data.serviceCommission || 0;
                commissionCash += (data.cash || 0) * commission;
                commissionCard += (data.card || 0) * commission;
            }
        });

        const commissionSum = commissionCash + commissionCard;

        await setDoc(doc(db, "commissions", `girl${girlID}`), {
            commission_cash: commissionCash,
            commission_card: commissionCard,
            commission_sum: commissionSum
        }, { merge: true });

    } catch (error) {
        console.error("Hiba a jutalék összegzésnél:", error);
    }
};

export default updateCommissionSummary;

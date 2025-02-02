import { doc, deleteDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../database/firebase-config";
import updateTotalSummary from "../../database/Summary/updateTotalSummary";

const removeSelectedGirl = async (girlToRemove, services) => {
    try {
        // Töröld a lányt a `selectedGirls` kollekcióból
        await deleteDoc(doc(db, "selectedGirls", girlToRemove.id));

        //Keresd meg és töröld az összes tranzakciót a `transactions` kollekcióból
        const transactionsQuery = query(
            collection(db, "transactions"),
            where("girlID", "==", girlToRemove.id)
        );

        const transactionSnapshot = await getDocs(transactionsQuery);
        const deletePromises = transactionSnapshot.docs.map(docSnap => deleteDoc(doc(db, "transactions", docSnap.id)));
        await Promise.all(deletePromises);

        //(Opcionális) Töröld a jutalékokat a `commissions` kollekcióból
        await deleteDoc(doc(db, "commissions", `girl${girlToRemove.id}`));
        await updateTotalSummary(services);
        console.log(`Törölve: ${girlToRemove.name} és az összes hozzá tartozó adat.`);
    } catch (error) {
        console.error("Hiba a törlés során:", error);
    }
};

export default removeSelectedGirl;

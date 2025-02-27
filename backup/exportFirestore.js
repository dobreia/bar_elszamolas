const admin = require("firebase-admin");
const { getFirestore } = require("firebase-admin/firestore");
const fs = require("fs");

// Firebase ÉLES adatbázis inicializálása
const serviceAccount = require("./serviceAccountProduction.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = getFirestore();

// Exportálandó Firestore gyűjtemények
const collections = ["transactions", "girls", "services"];

const exportFirestoreToJson = async () => {
    let firestoreData = {};

    for (const collectionName of collections) {
        const snapshot = await db.collection(collectionName).get();
        firestoreData[collectionName] = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    }

    fs.writeFileSync("firestoreBackup.json", JSON.stringify(firestoreData, null, 2));
    console.log("Firestore adatok sikeresen exportálva: firestoreBackup.json");
};

exportFirestoreToJson();

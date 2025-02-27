const admin = require("firebase-admin");
const { getFirestore } = require("firebase-admin/firestore");
const fs = require("fs");

//Firebase TESZT adatbázis inicializálása
const serviceAccount = require("./serviceAccountTesting.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = getFirestore();

//JSON adat importálása Firestore-ba
const importFirestoreFromJson = async () => {
    const rawData = fs.readFileSync("firestoreBackup.json");
    const firestoreData = JSON.parse(rawData);

    for (const collectionName in firestoreData) {
        for (const document of firestoreData[collectionName]) {
            const docRef = db.collection(collectionName).doc(document.id);
            await docRef.set(document);
            console.log(`Importált dokumentum: ${collectionName}/${document.id}`);
        }
    }

    console.log("Firestore adatok sikeresen importálva a TESZT adatbázisba!");
};

importFirestoreFromJson();

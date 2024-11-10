import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAjYZ_84jw8Z5__V9zsdx5Dii3zcMeavF4",
    authDomain: "bar-elszamolas.firebaseapp.com",
    projectId: "bar-elszamolas",
    storageBucket: "bar-elszamolas.firebasestorage.app",
    messagingSenderId: "206871876831",
    appId: "1:206871876831:web:0001253d4b40afc2cfc56a",
    measurementId: "G-TVC07XKL4P"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

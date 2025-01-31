import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GirlsTable from './components/GirlsTable/GirlsTable';
import GirlsName from './components/GirlsName';
import Services from './components/Services';
import Navbar from './components/Navbar';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from './database/firebase-config'; // Az adatbázisod konfiguráció


function App() {
  // Központi állapot az adatokhoz
  const [girlsName, setGirlsName] = useState([]);
  const [services, setServices] = useState([]);


  useEffect(() => {
    // Valós idejű adatlekérés Firestore-ból
    const unsubscribe = onSnapshot(collection(db, 'girls'), (snapshot) => {
      const girlsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setGirlsName(girlsList);
    });

    return () => unsubscribe(); // Takarítás
  }, []);

  useEffect(() => {
    // Valós idejű adatlekérés Firestore-ból
    const unsubscribe = onSnapshot(collection(db, 'services'), (snapshot) => {
      const servicesList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setServices(servicesList);
    });

    return () => unsubscribe(); // Takarítás
  }, []);






  return (
    <div>
      <Router basename="/bar_elszamolas">
        <Navbar />
        <Routes>
          <Route path="/" element={<GirlsTable girlsName={girlsName} />} />
          <Route path='/girlsName' element={<GirlsName girlsName={girlsName} setGirlsName={setGirlsName} />} />
          <Route path='/services' element={<Services services={services} setServices={setServices} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

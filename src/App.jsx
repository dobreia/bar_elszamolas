import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GirlsTable from './components/GirlsTable/GirlsTable';
import GirlsName from './components/GirlsName';
import Navbar from './components/Navbar';
import addGirlsData from './database/AddGirlsData';
import './styles/Girls.css'
import './styles/Navbar.css'
import './styles/GirlsName.css'
import { collection, getDocs } from 'firebase/firestore';
import { db } from './database/firebase-config'; // Az adatbázisod konfiguráció



function App() {
  const [girlsName, setGirlsName] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "girls"));
        const girlsList = querySnapshot.docs.map(doc => doc.data().name);
        setGirlsName(girlsList);
      } catch (error) {
        console.error("Hiba történt az adatok lekérése közben.", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Router basename="/bar_elszamolas">
        <Navbar />
        <Routes>
          <Route path="/" element={<GirlsTable girlsName={girlsName} />} />
          <Route path='/girlsName' element={<GirlsName girlsName={girlsName} setGirlsName={setGirlsName} />} />
        </Routes>
      </Router>

    </div>


  );
}

export default App;

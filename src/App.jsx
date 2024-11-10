import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GirlsTable from './components/GirlsTable/GirlsTable';
import Navbar from './components/Navbar';
import addGirlsData from './database/AddGirlsData';
import deleteDuplicateGirls from './database/DeleteDuplicateGirls';
import './styles/Girls.css'
import './styles/Navbar.css'



function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<GirlsTable />} />
          <Route path='/girlsName' element={<girlsName />} />
        </Routes>
      </Router>

    </div>


  );
}

export default App;

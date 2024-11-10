import logo from './logo.svg';
import './App.css';
import './components/GirlsTable/Girls.css'
import GirlsTable from './components/GirlsTable/GirlsTable';
import addGirlsData from './database/AddGirlsData';
import deleteDuplicateGirls from './database/DeleteDuplicateGirls';


function App() {
  return (
    <div className="App">
      <GirlsTable />
    </div>
  );
}

export default App;

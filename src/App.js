import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import DashBoard from "./Containers/DashBoard";
import Vehicles from "./Containers/VehiclesList/Vehicles";
import NavBar from "./Containers/NavBar/NavBar";
function App() {
  return (
    <div className="App">
      <Router>
        <NavBar></NavBar>
        <Routes>
          <Route path="/" element={<DashBoard />} />
          <Route path="/vehicles" element={<Vehicles />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

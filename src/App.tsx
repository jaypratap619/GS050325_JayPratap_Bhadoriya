import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StoresPage from "./pages/StoresPage";
import SkusPage from "./pages/SkusPage";
import PlanningPage from "./pages/PlanningPage";
import ChartPage from "./pages/ChartPage";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <Navbar />
          <div className="p-4">
            <Routes>
              <Route path="/" element={<StoresPage />} />
              <Route path="/skus" element={<SkusPage />} />
              <Route path="/planning" element={<PlanningPage />} />
              <Route path="/chart" element={<ChartPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;

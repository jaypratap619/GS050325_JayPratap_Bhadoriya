import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StoresPage from "./pages/StoresPage";
import SkusPage from "./pages/SkusPage";
import PlanningPage from "./pages/PlanningPage";
import ChartPage from "./pages/ChartPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StoresPage />} />
        <Route path="/skus" element={<SkusPage />} />
        <Route path="/planning" element={<PlanningPage />} />
        <Route path="/chart" element={<ChartPage />} />
      </Routes>
    </Router>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StoresPage from "./pages/StoresPage";
import SkusPage from "./pages/SkusPage";
import PlanningPage from "./pages/PlanningPage";
import ChartPage from "./pages/ChartPage";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ErrorBoundary from "./utils/ErrorBoundary"; // Import the ErrorBoundary component

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Navbar at the top, full width */}
        <Navbar />

        {/* Main content area with Sidebar and Page Content in parallel */}
        <div className="flex flex-1">
          {/* Sidebar */}
          <Sidebar />

          {/* Page Content */}
          <div className="flex-1 p-6 bg-gray-100">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <Routes>
                {/* Wrap each Route with ErrorBoundary */}
                <Route
                  path="/"
                  element={
                    <ErrorBoundary fallback={<h1>Something went wrong in the Stores Page.</h1>}>
                      <StoresPage />
                    </ErrorBoundary>
                  }
                />
                <Route
                  path="/skus"
                  element={
                    <ErrorBoundary fallback={<h1>Something went wrong in the SKUs Page.</h1>}>
                      <SkusPage />
                    </ErrorBoundary>
                  }
                />
                <Route
                  path="/planning"
                  element={
                    <ErrorBoundary fallback={<h1>Something went wrong in the Planning Page.</h1>}>
                      <PlanningPage />
                    </ErrorBoundary>
                  }
                />
                <Route
                  path="/chart"
                  element={
                    <ErrorBoundary fallback={<h1>Something went wrong in the Chart Page.</h1>}>
                      <ChartPage />
                    </ErrorBoundary>
                  }
                />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
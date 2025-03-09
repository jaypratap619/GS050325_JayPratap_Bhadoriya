// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import StoresPage from "./pages/StoresPage";
import SkusPage from "./pages/SkusPage";
import PlanningPage from "./pages/PlanningPage";
import ChartPage from "./pages/ChartPage";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ErrorBoundary from "./utils/ErrorBoundary";
import { reorderStores } from "./redux/storesSlice";
import { reorderSKUs } from "./redux/skusSlice";
import { reorderCalendar } from "./redux/calendarSlice";
import { reorderCalculations } from "./redux/calculationsSlice";
import { reorderPlans } from "./redux/planningSlice";
import * as XLSX from "xlsx";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const dispatch = useDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch("/assets/SampleData.xlsx");
        const arrayBuffer = await response.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: "array" });
        const sheetNames = workbook.SheetNames;

        // Load Stores
        const storesSheet = workbook.Sheets[sheetNames[0]];
        const storesData = XLSX.utils.sheet_to_json(storesSheet);
        const stores = storesData.map((item: any) => ({
          id: item["ID"],
          label: item["Label"],
          city: item["City"],
          state: item["State"],
        }));
        dispatch(reorderStores(stores));

        // Load SKUs
        const skusSheet = workbook.Sheets[sheetNames[1]];
        const skusData = XLSX.utils.sheet_to_json(skusSheet);
        const skus = skusData.map((item: any) => ({
          id: item["ID"],
          label: item["Label"],
          class: item["Class"],
          department: item["Department"],
          price: item["Price"],
          cost: item["Cost"],
        }));
        dispatch(reorderSKUs(skus));

        // Load Planning
        const calendarSheet = workbook.Sheets[sheetNames[2]];
        const calendarData = XLSX.utils.sheet_to_json(calendarSheet);
        const calendar = calendarData.map((item: any) => ({
          week: item["Week"],
          weekLabel: item["Week Label"],
          month: item["Month"],
          monthLabel: item["Month Label"],
        }));
        dispatch(reorderCalendar(calendar));

        // Load Plannings
        const planningSheet = workbook.Sheets[sheetNames[3]];
        const planningData = XLSX.utils.sheet_to_json(planningSheet);
        const plans = planningData.map((item: any) => ({
          store: item["Store"],
          sku: item["SKU"],
          week: item["Week"],
          salesUnit: item["Sales Units"],
        }));
        dispatch(reorderPlans(plans));

        // Load Calculations
        const calculationsSheet = workbook.Sheets[sheetNames[4]];
        const calculationsData = XLSX.utils.sheet_to_json(calculationsSheet);
        const parsedCalculations = calculationsData.map((item: any) => ({
          store: item["Store"],
          sku: item["SKU"],
          week: item["Week"],
          salesUnits: item["Sales Units"],
          salesDollars: parseFloat(item["Sales Dollars"]),
          costDollars: parseFloat(item["Cost Dollars"]),
          gmDollars: parseFloat(item["GM Dollars"]),
          gmPercent: parseFloat(item["GM %"]) / 100,
        }));
        dispatch(reorderCalculations(parsedCalculations));
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    loadData();
  }, [dispatch]);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <div className="flex flex-1">
          {/* Sidebar with responsive visibility */}
          <div
            className={`fixed inset-y-0 left-0 z-30 w-64 bg-white text-gray-800 shadow-md transform transition-transform duration-200 ease-in-out ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } md:translate-x-0 md:relative`}
          >
            <Sidebar closeSidebar={() => setIsSidebarOpen(false)} />
          </div>
          {/* Main content area with reduced padding for mobile */}
          <div className="flex-1 p-2 md:p-3 bg-gray-100">
            <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
              <Routes>
                <Route
                  path="/"
                  element={
                    <ErrorBoundary fallback={<h1>Something went wrong in the Stores Page.</h1>}>
                      <ProtectedRoute><StoresPage /></ProtectedRoute>
                    </ErrorBoundary>
                  }
                />
                <Route
                  path="/skus"
                  element={
                    <ErrorBoundary fallback={<h1>Something went wrong in the SKUs Page.</h1>}>
                      <ProtectedRoute><SkusPage /></ProtectedRoute>
                    </ErrorBoundary>
                  }
                />
                <Route
                  path="/planning"
                  element={
                    <ErrorBoundary fallback={<h1>Something went wrong in the Planning Page.</h1>}>
                      <ProtectedRoute><PlanningPage /></ProtectedRoute>
                    </ErrorBoundary>
                  }
                />
                <Route
                  path="/chart"
                  element={
                    <ErrorBoundary fallback={<h1>Something went wrong in the Chart Page.</h1>}>
                      <ProtectedRoute><ChartPage /></ProtectedRoute>
                    </ErrorBoundary>
                  }
                />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
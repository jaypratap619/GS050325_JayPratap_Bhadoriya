import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addStore, removeStore, reorderStores } from "../redux/storesSlice";
import { RootState } from "../redux/store";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Quartz theme
import { IStore } from "../redux/types";
import * as XLSX from "xlsx";
import { ModuleRegistry, AllCommunityModule, ColDef } from "ag-grid-community";

// Register Ag-Grid modules (Only once)
ModuleRegistry.registerModules([AllCommunityModule]);

const StoresPage: React.FC = () => {
  const dispatch = useDispatch();
  const stores = useSelector((state: RootState) => state.stores.stores);
  const [newStore, setNewStore] = useState<IStore>({ id: "", label: "", city: "", state: "" });
  const [isAccordionOpen, setIsAccordionOpen] = useState(false); // State for accordion toggle

  // Initialize columnDefs inside useState/useEffect to avoid undefined issues
  const [columnDefs, setColumnDefs] = useState<ColDef<IStore>[]>([]);

  useEffect(() => {
    setColumnDefs([
      { headerName: "Seq No.", valueGetter: "node.rowIndex + 1", width: 100 },
      { field: "id", headerName: "ID", width: 150 },
      { field: "label", headerName: "Label", width: 150 },
      { field: "city", headerName: "City", width: 150 },
      { field: "state", headerName: "State", width: 150 },
      {
        headerName: "Actions",
        cellRenderer: (params: any) => (
          <button
            onClick={() => handleRemoveStore(params.data.id)}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Remove
          </button>
        ),
        width: 120,
      },
    ]);
  }, []);

  // Default column properties
  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      resizable: true,
    }),
    []
  );

  useEffect(() => {
    const loadStoresData = async () => {
      try {
        const response = await fetch("/assets/SampleData.xlsx");
        const arrayBuffer = await response.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);
        const stores = json.map((item: any) => ({
          id: item["ID"],
          label: item["Label"],
          city: item["City"],
          state: item["State"],
        }));
        dispatch(reorderStores(stores));
      } catch (error) {
        console.error("Error loading store data:", error);
      }
    };

    loadStoresData();
  }, [dispatch]);

  const handleAddStore = () => {
    if (!newStore.id || !newStore.label) return;
    dispatch(addStore(newStore));
    setNewStore({ id: "", label: "", city: "", state: "" });
  };

  const handleRemoveStore = (id: string) => {
    dispatch(removeStore(id));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-xl font-bold text-gray-800 mb-6">Stores Management</h1>

      {/* Data Grid Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Stores List</h2>
        {stores.length > 0 && columnDefs.length > 0 ? (
          <div className="ag-theme-quartz" style={{ height: 400, width: "100%" }}>
            <AgGridReact<IStore> rowData={stores} columnDefs={columnDefs} defaultColDef={defaultColDef} />
          </div>
        ) : (
          <p className="text-gray-600">Loading data...</p>
        )}
      </div>

      {/* Accordion for Add New Store */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <button
          onClick={() => setIsAccordionOpen(!isAccordionOpen)}
          className="w-full text-left text-lg font-semibold text-gray-700 focus:outline-none"
        >
          Add a New Store
          <span className="float-right transform transition-transform duration-200">
            {isAccordionOpen ? "▲" : "▼"}
          </span>
        </button>

        {/* Accordion Content */}
        {isAccordionOpen && (
          <div className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ID</label>
                <input
                  type="text"
                  placeholder="Enter ID"
                  value={newStore.id}
                  onChange={(e) => setNewStore({ ...newStore, id: e.target.value })}
                  className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Label</label>
                <input
                  type="text"
                  placeholder="Enter Label"
                  value={newStore.label}
                  onChange={(e) => setNewStore({ ...newStore, label: e.target.value })}
                  className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <input
                  type="text"
                  placeholder="Enter City"
                  value={newStore.city}
                  onChange={(e) => setNewStore({ ...newStore, city: e.target.value })}
                  className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                <input
                  type="text"
                  placeholder="Enter State"
                  value={newStore.state}
                  onChange={(e) => setNewStore({ ...newStore, state: e.target.value })}
                  className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <button
              onClick={handleAddStore}
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Add Store
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoresPage;
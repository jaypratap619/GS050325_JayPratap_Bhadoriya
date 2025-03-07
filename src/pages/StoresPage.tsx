import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addStore, removeStore, updateStore, reorderStores } from "../redux/storesSlice";
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
          <div>
            <button onClick={() => handleRemoveStore(params.data.id)}>Remove</button>
            <button onClick={() => handleUpdateStore({ ...params.data, label: "Updated Label" })}>
              Update
            </button>
          </div>
        ),
        width: 200,
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

  const handleUpdateStore = (store: IStore) => {
    dispatch(updateStore(store));
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">Stores</h1>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="ID"
          value={newStore.id}
          onChange={(e) => setNewStore({ ...newStore, id: e.target.value })}
          className="border p-2"
        />
        <input
          type="text"
          placeholder="Label"
          value={newStore.label}
          onChange={(e) => setNewStore({ ...newStore, label: e.target.value })}
          className="border p-2"
        />
        <input
          type="text"
          placeholder="City"
          value={newStore.city}
          onChange={(e) => setNewStore({ ...newStore, city: e.target.value })}
          className="border p-2"
        />
        <input
          type="text"
          placeholder="State"
          value={newStore.state}
          onChange={(e) => setNewStore({ ...newStore, state: e.target.value })}
          className="border p-2"
        />
        <button onClick={handleAddStore} className="bg-blue-500 text-white px-4 py-2">
          Add Store
        </button>
      </div>

      {/* Ensure data is available before rendering AgGridReact */}
      {stores.length > 0 && columnDefs.length > 0 ? (
        <div className="ag-theme-quartz" style={{ height: 400, width: "100%" }}>
          <AgGridReact<IStore> rowData={stores} columnDefs={columnDefs} defaultColDef={defaultColDef} />
        </div>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default StoresPage;

import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSKU, removeSKU, updateSKU, reorderSKUs } from "../redux/skusSlice";
import { RootState } from "../redux/store";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Quartz theme
import { ISKU } from "../redux/types";
import * as XLSX from "xlsx";
import { ModuleRegistry, AllCommunityModule, ColDef } from "ag-grid-community";

// Register Ag-Grid modules (Only once)
ModuleRegistry.registerModules([AllCommunityModule]);

const SkusPage: React.FC = () => {
  const dispatch = useDispatch();
  const skus = useSelector((state: RootState) => state.skus.skus);
  const [newSKU, setNewSKU] = useState<ISKU>({
    id: "",
    label: "",
    class: "",
    department: "",
    price: 0,
    cost: 0,
  });

  // Column definitions
  const [columnDefs, setColumnDefs] = useState<ColDef<ISKU>[]>([]);

  useEffect(() => {
    setColumnDefs([
      { headerName: "Seq No.", valueGetter: "node.rowIndex + 1", width: 100 },
      { field: "id", headerName: "ID", width: 150 },
      { field: "label", headerName: "Label", width: 150 },
      { field: "class", headerName: "Class", width: 150 },
      { field: "department", headerName: "Department", width: 150 },
      { field: "price", headerName: "Price", width: 150 },
      { field: "cost", headerName: "Cost", width: 150 },
      {
        headerName: "Actions",
        cellRenderer: (params: any) => (
          <div>
            <button onClick={() => handleRemoveSKU(params.data.id)}>Remove</button>
            <button onClick={() => handleUpdateSKU({ ...params.data, label: "Updated Label" })}>
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
    const loadSkusData = async () => {
      try {
        const response = await fetch("/assets/SampleData.xlsx");
        const arrayBuffer = await response.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: "array" });
        const sheetName = workbook.SheetNames[1]; // Second sheet (SKUs)
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);
        const skus = json.map((item: any) => ({
          id: item["ID"],
          label: item["Label"],
          class: item["Class"],
          department: item["Department"],
          price: item["Price"],
          cost: item["Cost"],
        }));
        dispatch(reorderSKUs(skus));
      } catch (error) {
        console.error("Error loading SKU data:", error);
      }
    };

    loadSkusData();
  }, [dispatch]);

  const handleAddSKU = () => {
    if (!newSKU.id || !newSKU.label) return;
    dispatch(addSKU(newSKU));
    setNewSKU({ id: "", label: "", class: "", department: "", price: 0, cost: 0 });
  };

  const handleRemoveSKU = (id: string) => {
    dispatch(removeSKU(id));
  };

  const handleUpdateSKU = (sku: ISKU) => {
    dispatch(updateSKU(sku));
  };

  return (
    <div className="p-4">
      <h1 className="text-md font-semibold mb-4">SKUs</h1>
      <div className="flex flex-wrap gap-1 mb-4">
        <input
          type="text"
          placeholder="ID"
          value={newSKU.id}
          onChange={(e) => setNewSKU({ ...newSKU, id: e.target.value })}
          className="border p-2 min-w-0 flex-1"
        />
        <input
          type="text"
          placeholder="Label"
          value={newSKU.label}
          onChange={(e) => setNewSKU({ ...newSKU, label: e.target.value })}
          className="border p-2 min-w-0 flex-1"
        />
        <input
          type="text"
          placeholder="Class"
          value={newSKU.class}
          onChange={(e) => setNewSKU({ ...newSKU, class: e.target.value })}
          className="border p-2 min-w-0 flex-1"
        />
        <input
          type="text"
          placeholder="Department"
          value={newSKU.department}
          onChange={(e) => setNewSKU({ ...newSKU, department: e.target.value })}
          className="border p-2 min-w-0 flex-1"
        />
        <input
          type="number"
          placeholder="Price"
          value={newSKU.price}
          onChange={(e) => setNewSKU({ ...newSKU, price: parseFloat(e.target.value) })}
          className="border p-2 min-w-0 flex-1"
        />
        <input
          type="number"
          placeholder="Cost"
          value={newSKU.cost}
          onChange={(e) => setNewSKU({ ...newSKU, cost: parseFloat(e.target.value) })}
          className="border p-2 min-w-0 flex-1"
        />
        <button onClick={handleAddSKU} className="bg-blue-500 text-white px-4 py-2">
          Add SKU
        </button>
      </div>

      {/* Ensure data is available before rendering AgGridReact */}
      {skus.length > 0 && columnDefs.length > 0 ? (
        <div className="ag-theme-quartz" style={{ height: 400, width: "100%" }}>
          <AgGridReact<ISKU> rowData={skus} columnDefs={columnDefs} defaultColDef={defaultColDef} />
        </div>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default SkusPage;

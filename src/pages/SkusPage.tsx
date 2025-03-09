import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSKU, removeSKU, reorderSKUs } from "../redux/skusSlice";
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
  const [isAccordionOpen, setIsAccordionOpen] = useState(false); // State for accordion toggle

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
          <button
            onClick={() => handleRemoveSKU(params.data.id)}
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

  return (
    <div className="p-2 md:p-6 bg-gray-100 min-h-screen"> {/* Reduced padding for mobile */}
      <h1 className="text-xl font-bold text-gray-800 mb-4 md:mb-6">SKUs Management</h1> {/* Adjusted margin for mobile */}

      {/* Data Grid Section */}
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-md mb-4 md:mb-6"> {/* Reduced padding for mobile */}
        <h2 className="text-lg font-semibold text-gray-700 mb-2 md:mb-4">SKUs List</h2> {/* Adjusted margin for mobile */}
        {skus.length > 0 && columnDefs.length > 0 ? (
          <div className="ag-theme-quartz" style={{ height: 400, width: "100%" }}>
            <AgGridReact<ISKU> rowData={skus} columnDefs={columnDefs} defaultColDef={defaultColDef} />
          </div>
        ) : (
          <p className="text-gray-600">Loading data...</p>
        )}
      </div>

      {/* Accordion for Add New SKU */}
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-md"> {/* Reduced padding for mobile */}
        <button
          onClick={() => setIsAccordionOpen(!isAccordionOpen)}
          className="w-full text-left text-lg font-semibold text-gray-700 focus:outline-none"
        >
          Add a New SKU
          <span className="float-right transform transition-transform duration-200">
            {isAccordionOpen ? "▲" : "▼"}
          </span>
        </button>

        {/* Accordion Content */}
        {isAccordionOpen && (
          <div className="mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ID</label>
                <input
                  type="text"
                  placeholder="Enter ID"
                  value={newSKU.id}
                  onChange={(e) => setNewSKU({ ...newSKU, id: e.target.value })}
                  className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Label</label>
                <input
                  type="text"
                  placeholder="Enter Label"
                  value={newSKU.label}
                  onChange={(e) => setNewSKU({ ...newSKU, label: e.target.value })}
                  className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
                <input
                  type="text"
                  placeholder="Enter Class"
                  value={newSKU.class}
                  onChange={(e) => setNewSKU({ ...newSKU, class: e.target.value })}
                  className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                <input
                  type="text"
                  placeholder="Enter Department"
                  value={newSKU.department}
                  onChange={(e) => setNewSKU({ ...newSKU, department: e.target.value })}
                  className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                <input
                  type="number"
                  placeholder="Enter Price"
                  value={newSKU.price}
                  onChange={(e) => setNewSKU({ ...newSKU, price: parseFloat(e.target.value) })}
                  className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cost</label>
                <input
                  type="number"
                  placeholder="Enter Cost"
                  value={newSKU.cost}
                  onChange={(e) => setNewSKU({ ...newSKU, cost: parseFloat(e.target.value) })}
                  className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <button
              onClick={handleAddSKU}
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Add SKU
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkusPage;
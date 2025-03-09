import React, { useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { ModuleRegistry, AllCommunityModule, ColDef } from "ag-grid-community";

ModuleRegistry.registerModules([AllCommunityModule]);

const PlanningPage: React.FC = () => {
  // Fetch data from Redux store
  const stores = useSelector((state: RootState) => state.stores.stores);
  const skus = useSelector((state: RootState) => state.skus.skus);

  // Log data for debugging
  console.log("Stores from Redux:", stores);
  console.log("SKUs from Redux:", skus);

  // Define column definitions for AG-Grid
  const columnDefs: ColDef[] = useMemo(() => [
    { headerName: "Store", field: "store", pinned: "left" },
    { headerName: "SKU", field: "sku", pinned: "left" },
  ], []);

  // Generate row data by cross-joining stores and SKUs
  const rowData = useMemo(() => {
    if (!stores.length || !skus.length) return []; // Return empty array if data is not loaded

    const rowData = stores.flatMap((store) =>
      skus.map((sku) => ({
        store: store.label, // Use store label
        sku: sku.label, // Use SKU label
      }))
    );

    // Slice the rowData to get only the first 10 elements
    return rowData;
  }, [stores, skus]);

  // Define default column definitions
  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      resizable: true,
    }),
    []
  );

  // Show loading state if data is not yet available
  if (!stores.length || !skus.length || !rowData.length) {
    return <div>Loading...</div>;
  }

  // Debugging logs
  console.log("RowData:", rowData);
  console.log("ColumnDefs:", columnDefs);

  return (
    <div className="p-2 md:p-4"> {/* Reduced padding for mobile */}
      <h1 className="text-md font-semibold pb-2 md:pb-4">Plannings</h1> {/* Adjusted margin for mobile */}
      <div className="ag-theme-alpine" style={{ height: "500px", width: "100%" }}>
        <AgGridReact
          columnDefs={columnDefs}
          rowData={rowData}
          defaultColDef={defaultColDef}
        />
      </div>
    </div>
  );
};

export default PlanningPage;
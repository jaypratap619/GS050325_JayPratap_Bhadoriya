import React from "react";
// import { AgGridReact } from "ag-grid-react";
// import "ag-grid-community/styles/ag-grid.css";
// import "ag-grid-community/styles/ag-theme-alpine.css";
// import { useSelector } from "react-redux";
// import { RootState } from "../redux/store";
// import { ColDef, ColGroupDef } from "ag-grid-community";

// const PlanningPage: React.FC = () => {
//   // Fetch data from Redux store
//   const stores = useSelector((state: RootState) => state.stores.stores);
//   const skus = useSelector((state: RootState) => state.skus.skus);
//   const calendar = useSelector((state: RootState) => state.calendar.calendar);
//   const plans = useSelector((state: RootState) => state.plans.plans);

//   // Log data for debugging
//   console.log("Stores:", stores);
//   console.log("SKUs:", skus);
//   console.log("Calendar:", calendar);
//   console.log("Plans:", plans);

//   // Generate column definitions dynamically based on calendar weeks
//   const columnDefs: (ColDef | ColGroupDef)[] = useMemo(() => {
//     if (!calendar.length) return []; // Return empty array if calendar data is not loaded

//     const baseColumns: ColDef[] = [
//       { headerName: "Store", field: "store", pinned: "left" },
//       { headerName: "SKU", field: "sku", pinned: "left" },
//     ];

//     const weekColumns: ColGroupDef[] = calendar.map((week) => ({
//       headerName: week.weekLabel,
//       children: [
//         {
//           headerName: "Sales Units",
//           field: `${week.week}.salesUnits`,
//           editable: true,
//         },
//         {
//           headerName: "Sales Dollars",
//           field: `${week.week}.salesDollars`,
//           valueFormatter: (params: any) => `$${params.value?.toFixed(2) || "0.00"}`,
//         },
//         {
//           headerName: "GM Dollars",
//           field: `${week.week}.gmDollars`,
//           valueFormatter: (params: any) => `$${params.value?.toFixed(2) || "0.00"}`,
//         },
//         {
//           headerName: "GM %",
//           field: `${week.week}.gmPercent`,
//           valueFormatter: (params: any) => `${((params.value || 0) * 100).toFixed(2)}%`,
//           cellStyle: (params: any) => {
//             const gmPercent = params.value || 0;
//             if (gmPercent >= 0.4) return { backgroundColor: "green" };
//             if (gmPercent >= 0.1) return { backgroundColor: "yellow" };
//             if (gmPercent > 0.05) return { backgroundColor: "orange" };
//             return { backgroundColor: "red" };
//           },
//         },
//       ],
//     }));

//     return [...baseColumns, ...weekColumns];
//   }, [calendar]);

//   // Generate row data by cross-joining stores and SKUs
//   const rowData = useMemo(() => {
//     if (!stores.length || !skus.length || !calendar.length || !plans.length) return []; // Return empty array if data is not loaded

//     return stores.flatMap((store) =>
//       skus.map((sku) => {
//         const row: any = { store: store.label, sku: sku.label };
//         calendar.forEach((week) => {
//           const plan = plans.find(
//             (p) => p.store === store.id && p.sku === sku.id && p.week === week.week
//           );
//           const salesUnits = plan?.salesUnit || 0;
//           const salesDollars = salesUnits * (sku.price || 0);
//           const gmDollars = salesDollars - salesUnits * (sku.cost || 0);
//           const gmPercent = salesDollars > 0 ? gmDollars / salesDollars : 0;

//           row[week.week] = {
//             salesUnits,
//             salesDollars,
//             gmDollars,
//             gmPercent,
//           };
//         });
//         return row;
//       })
//     );
//   }, [stores, skus, calendar, plans]);

//   // Show loading state if data is not yet available
//   if (!stores.length || !skus.length || !calendar.length || !plans.length) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="ag-theme-alpine" style={{ height: "100%", width: "100%" }}>
//       <AgGridReact
//         columnDefs={columnDefs}
//         rowData={rowData}
//         defaultColDef={{
//           resizable: true,
//           sortable: true,
//           filter: true,
//         }}
//       />
//     </div>
//   );
// };

const PlanningPage: React.FC = () =>{
  return  <h1>Planning Page: yet to implement</h1>
}


export default PlanningPage;
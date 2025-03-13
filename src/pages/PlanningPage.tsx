import React, { useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { RootState } from "../redux/store";
import { updateSalesUnits } from "../redux/planningSlice";
import { ICellRendererParams, ValueSetterParams } from "ag-grid-community";

const PlanningPage: React.FC = () => {
  const weeks = useMemo(() => Array.from({ length: 52 }, (_, i) => `W${String(i + 1).padStart(2, "0")}`), []);
  const dispatch = useDispatch();

  // Fetch plans directly from Redux
  const plans = useSelector((state: RootState) => state.planning.rowData || []);
  const skus = useSelector((state: RootState) => state.skus.skus || []);

  // Transform data for AG Grid
  const rowData = useMemo(() => {
    if (plans.length === 0 || skus.length === 0) return [];

    const groupedData: { [key: string]: any } = {};
    plans.forEach(({ store, sku, week, salesUnit }) => {
      const key = `${store}_${sku}`;
      if (!groupedData[key]) {
        groupedData[key] = {
          store,
          sku,
          ...weeks.reduce((acc, w) => {
            acc[`${w}_salesUnits`] = 0;
            acc[`${w}_salesDollars`] = 0;
            acc[`${w}_costDollars`] = 0;
            acc[`${w}_gmDollars`] = 0;
            acc[`${w}_gmPercent`] = 0;
            return acc;
          }, {} as Record<string, number>),
        };
      }

      groupedData[key][`${week}_salesUnits`] = salesUnit;

      const skuDetails = skus.find((s) => s.id === sku);
      if (skuDetails) {
        const salesDollars = salesUnit * skuDetails.price;
        const costDollars = salesUnit * skuDetails.cost;
        const gmDollars = salesDollars - costDollars;
        const gmPercent = salesDollars ? (gmDollars / salesDollars) * 100 : 0;

        groupedData[key][`${week}_salesDollars`] = salesDollars;
        groupedData[key][`${week}_costDollars`] = costDollars;
        groupedData[key][`${week}_gmDollars`] = gmDollars;
        groupedData[key][`${week}_gmPercent`] = gmPercent;
      }
    });

    return Object.values(groupedData);
  }, [plans, skus, weeks]);

  const onCellValueChanged = useCallback(
    (params: ValueSetterParams) => {
      if (!params.colDef.field?.includes("salesUnits")) return;
      const week = params.colDef.field.substring(0, 3);
      const store = params.data.store;
      const sku = params.data.sku;
      const salesUnit = Number(params.newValue) || 0; // Ensure it's a valid number

      dispatch(updateSalesUnits({ store, sku, week, salesUnit }));
    },
    [dispatch]
  );

  const columnDefs = useMemo(
    () => [
      { field: "store", headerName: "Store", editable: false, width: 150 },
      { field: "sku", headerName: "SKU", editable: false, width: 150 },
      ...weeks.map((week) => ({
        headerName: week,
        children: [
          { field: `${week}_salesUnits`, headerName: "Sales Units", editable: true, width: 160 },
          { field: `${week}_salesDollars`, headerName: "Sales Dollars", editable: false, width: 160 },
          { field: `${week}_costDollars`, headerName: "Cost Dollars", editable: false, width: 160 },
          { field: `${week}_gmDollars`, headerName: "GM Dollars", editable: false, width: 160 },
          {
            field: `${week}_gmPercent`,
            headerName: "GM %",
            editable: false,
            width: 160,
            cellStyle: (params: ICellRendererParams) => ({
              backgroundColor:
                params.value >= 40 ? "green" :
                params.value >= 10 ? "yellow" :
                params.value > 5 ? "orange" :
                "red",
              color: "black",
            }),
          },
        ],
      })),
    ],
    [weeks]
  );

  return (
    <div className="ag-theme-alpine" style={{ height: "85vh", width: "100%" }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        onCellValueChanged={onCellValueChanged}
        defaultColDef={{ flex: 1, resizable: true, minWidth: 160 }}
        animateRows={true}
      />
    </div>
  );
};

export default PlanningPage;

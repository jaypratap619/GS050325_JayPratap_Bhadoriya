import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { RootState } from "../redux/store";
import { updateSalesUnits } from "../redux/planningSlice";
import { ICellRendererParams } from "ag-grid-community";

const weeks = Array.from({ length: 52 }, (_, i) => `W${String(i + 1).padStart(2, "0")}`);

const PlanningPage: React.FC = () => {
  const dispatch = useDispatch();
  const plans = useSelector((state: RootState) => state.planning.rowData || []);
  const skus = useSelector((state: RootState) => state.skus.skus || []);

  const [rowData, setRowData] = useState<any[]>([]);

  useEffect(() => {
    if (plans.length > 0 && skus.length > 0) {
      const transformedData = transformPlanningData(plans, skus);
      setRowData(transformedData);
    }
  }, [plans, skus]);

  const transformPlanningData = (plans: any[], skus: any[]) => {
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
  };

  const onCellValueChanged = useCallback(
    (params: any) => {
      if (!params.colDef.field.includes("salesUnits")) return;

      const updatedData = rowData.map((row) => {
        if (row.sku === params.data.sku && row.store === params.data.store) {
          const updatedRow = { ...row };
          updatedRow[params.colDef.field] = params.newValue;

          weeks.forEach((week) => {
            const skuDetails = skus.find((s) => s.id === updatedRow.sku);
            if (skuDetails) {
              const salesUnit = updatedRow[`${week}_salesUnits`] || 0;
              updatedRow[`${week}_salesDollars`] = salesUnit * skuDetails.price;
              updatedRow[`${week}_costDollars`] = salesUnit * skuDetails.cost;
              updatedRow[`${week}_gmDollars`] =
                updatedRow[`${week}_salesDollars`] - updatedRow[`${week}_costDollars`];
              updatedRow[`${week}_gmPercent`] = updatedRow[`${week}_salesDollars`]
                ? (updatedRow[`${week}_gmDollars`] / updatedRow[`${week}_salesDollars`]) * 100
                : 0;
            }
          });

          return updatedRow;
        }
        return row;
      });

      setRowData(updatedData);
      dispatch(updateSalesUnits(updatedData));
    },
    [rowData, dispatch, skus]
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
    []
  );

  return (
    <div className="ag-theme-alpine" style={{ height: "85vh", width: "100%" }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        onCellValueChanged={onCellValueChanged}
        defaultColDef={{ flex: 1, resizable: true, minWidth: 160 }}
      />
    </div>
  );
};

export default PlanningPage;

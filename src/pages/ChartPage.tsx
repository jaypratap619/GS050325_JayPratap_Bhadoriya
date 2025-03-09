import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line, ComposedChart, ResponsiveContainer } from "recharts";

const ChartPage: React.FC = () => {
  const stores = useSelector((state: RootState) => state.stores.stores);
  const skus = useSelector((state: RootState) => state.skus.skus);
  const calendar = useSelector((state: RootState) => state.calendar.calendar);
  const plans = useSelector((state: RootState) => state.plans.plans);

  const [selectedStore, setSelectedStore] = useState<string>(stores[0]?.id || "");

  // Generate chart data for the selected store
  const chartData = useMemo(() => {
    if (!selectedStore) return [];

    return calendar.map((week) => {
      const storePlans = plans.filter((p) => p.store === selectedStore && p.week === week.week);
      const totalSalesDollars = storePlans.reduce((sum, plan) => {
        const sku = skus.find((s) => s.id === plan.sku);
        return sum + (plan.salesUnit * (sku?.price || 0));
      }, 0);
      const totalGMDollars = storePlans.reduce((sum, plan) => {
        const sku = skus.find((s) => s.id === plan.sku);
        return sum + (plan.salesUnit * (sku?.price || 0) - plan.salesUnit * (sku?.cost || 0));
      }, 0);
      const totalGMPercent = totalSalesDollars > 0 ? totalGMDollars / totalSalesDollars : 0;

      return {
        week: week.weekLabel,
        gmDollars: totalGMDollars,
        gmPercent: totalGMPercent * 100,
      };
    });
  }, [selectedStore, calendar, plans, skus]);

  return (
    <div className="p-2 md:p-4"> {/* Reduced padding for mobile */}
      <h1 className="text-xl font-semibold pb-2 md:pb-4">Charts</h1> {/* Adjusted margin for mobile */}
      <div className="mb-2 md:mb-4 border border-gray-300 rounded-lg p-2 md:p-4 w-full md:w-fit"> {/* Reduced padding for mobile */}
        <select
          value={selectedStore}
          onChange={(e) => setSelectedStore(e.target.value)}
          className="p-2 text-sm md:text-base"
        >
          {stores.map((store) => (
            <option key={store.id} value={store.id}>
              {store.label}
            </option>
          ))}
        </select>
      </div>

      <div className="w-full h-96 p-2 md:p-4 border border-gray-300 rounded-lg"> {/* Reduced padding for mobile */}
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis yAxisId="left" label={{ value: "GM Dollars", angle: -90, position: "insideLeft" }} />
            <YAxis yAxisId="right" orientation="right" label={{ value: "GM %", angle: -90, position: "insideRight" }} />
            <Tooltip />
            <Legend />
            <Bar yAxisId="left" dataKey="gmDollars" fill="#8884d8" name="GM Dollars" />
            <Line yAxisId="right" type="monotone" dataKey="gmPercent" stroke="#82ca9d" name="GM %" strokeWidth={3} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartPage;
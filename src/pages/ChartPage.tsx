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
    <div style={{ padding: "20px" }}>
      <h1 className="text-xl font-semibold pb-4">Charts</h1>
      <div style={{ marginBottom: "20px", border: "1px solid #ccc", borderRadius: "5px", padding: "10px", width: "fit-content" }}>
        <select
          value={selectedStore}
          onChange={(e) => setSelectedStore(e.target.value)}
          style={{ padding: "5px", fontSize: "16px" }}
        >
          {stores.map((store) => (
            <option key={store.id} value={store.id}>
              {store.label}
            </option>
          ))}
        </select>
      </div>

      <div style={{ width: "100%", height: "400px", padding: "20px", border: "1px solid #ccc", borderRadius: "5px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis
              yAxisId="left"
              label={{ value: "GM Dollars", angle: -90, position: "insideLeft", offset: 10 }} // Add padding to Y-axis label
              padding={{  }} // Add padding to prevent overlapping
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              label={{ value: "GM %", angle: -90, position: "insideRight" }}
            />
            <Tooltip />
            <Legend
              wrapperStyle={{ cursor: "pointer" }}
            />
              <Bar
                yAxisId="left"
                dataKey="gmDollars"
                fill="#8884d8"
                name="GM Dollars"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="gmPercent"
                stroke="#82ca9d"
                name="GM %"
                strokeWidth={3} // Make the line thicker
              />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartPage;
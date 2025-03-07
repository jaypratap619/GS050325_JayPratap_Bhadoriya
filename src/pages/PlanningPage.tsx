import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPlanningData, updatePlanningData, calculatePlanningData } from '../redux/planningSlice';
import { RootState } from '../redux/store';

const PlanningPage: React.FC = () => {
  const dispatch = useDispatch();
  const planningData = useSelector((state: RootState) => state.planning.planningData);
  const [newPlanningData, setNewPlanningData] = useState({ store: '', sku: '', week: '', salesUnits: 0 });

  const handleAddPlanningData = () => {
    dispatch(addPlanningData(newPlanningData));
    setNewPlanningData({ store: '', sku: '', week: '', salesUnits: 0 });
  };

  const handleUpdatePlanningData = (data: any) => {
    dispatch(updatePlanningData(data));
  };

  const handleCalculatePlanningData = () => {
    dispatch(calculatePlanningData());
  };

  return (
    <div>
      <h1>Planning</h1>
      <div>
        <input
          type="text"
          placeholder="Store"
          value={newPlanningData.store}
          onChange={(e) => setNewPlanningData({ ...newPlanningData, store: e.target.value })}
        />
        <input
          type="text"
          placeholder="SKU"
          value={newPlanningData.sku}
          onChange={(e) => setNewPlanningData({ ...newPlanningData, sku: e.target.value })}
        />
        <input
          type="text"
          placeholder="Week"
          value={newPlanningData.week}
          onChange={(e) => setNewPlanningData({ ...newPlanningData, week: e.target.value })}
        />
        <input
          type="number"
          placeholder="Sales Units"
          value={newPlanningData.salesUnits}
          onChange={(e) => setNewPlanningData({ ...newPlanningData, salesUnits: parseFloat(e.target.value) })}
        />
        <button onClick={handleAddPlanningData}>Add Planning Data</button>
        <button onClick={handleCalculatePlanningData}>Calculate Planning Data</button>
      </div>
      <ul>
        {planningData.map((data, index) => (
          <li key={index}>
            {data.store} - {data.sku} - {data.week} - {data.salesUnits} units
            <button onClick={() => handleUpdatePlanningData({ ...data, salesUnits: 100 })}>Update</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlanningPage;
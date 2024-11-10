import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Result.css";

function Result() {
  const [irrigationData, setIrrigationData] = useState([]);
  const [fieldData, setFieldData] = useState([]);
  const [calculatedData, setCalculatedData] = useState([]); // New state for calculated values
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [irrigationResponse, fieldResponse] = await Promise.all([
          axios.get("http://localhost:5000/api/irrigation"),
          axios.get("http://localhost:5000/api/field"),
        ]);
        setIrrigationData(irrigationResponse.data);
        setFieldData(fieldResponse.data);
      } catch (err) {
        setError("Failed to load data.");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const calculateWaterValues = () => {
      let tempAccumulatedRain = 0;
      const results = irrigationData
        .slice() // Make a copy of the array to reverse
        .reverse() // Reverse the array to calculate from latest to earliest
        .map((record) => {
          const field = fieldData.find(
            (data) => data.fieldId === record.fieldId
          );
          if (!field) return null;

          const fieldAreaM2 = field.fieldArea;
          const fieldDepthM = field.fieldDepth;
          const waterIrrigatedM3 = record.delta * fieldAreaM2 * fieldDepthM;

          // Accumulate rain sequentially
          tempAccumulatedRain += record.delta * fieldAreaM2 * fieldDepthM;

          // Calculate water needed based on accumulated rain
          const waterNeeded = Math.max(
            0,
            field.waterRequired - tempAccumulatedRain
          );

          console.log("accumulatedRain is", tempAccumulatedRain);
          console.log("water needed is", waterNeeded);

          return {
            ...record,
            fieldArea: field.fieldArea,
            waterRequired: field.waterRequired,
            waterIrrigatedM3,
            waterNeeded,
          };
        })
        .filter(Boolean); // Filter out any null results if fields are missing

      setCalculatedData(results);
    };

    if (irrigationData.length && fieldData.length) {
      calculateWaterValues();
    }
  }, [irrigationData, fieldData]); // Only re-run when irrigationData or fieldData changes

  const deleteRecord = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/irrigation/${id}`);
      setIrrigationData((prevData) =>
        prevData.filter((record) => record._id !== id)
      );
    } catch (error) {
      console.error("Error deleting record:", error);
      alert("Failed to delete record. Please try again.");
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="result-container">
      <h2 className="title">Irrigation Results</h2>
      <div className="results-table">
        <table>
          <thead>
            <tr>
              <th>Field Area (acres)</th>
              <th>Water Required (m³)</th>
              <th>Water Irrigated (m³)</th>
              <th>Water Needed (m³)</th>
              <th>Timestamp</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {calculatedData.map((record) => (
              <tr key={record._id}>
                <td>{record.fieldArea}</td>
                <td>{record.waterRequired?.toFixed(2) ?? "N/A"}</td>
                <td>{record.waterIrrigatedM3.toFixed(2)}</td>
                <td>{record.waterNeeded.toFixed(2)}</td>
                <td>{new Date(record.timestamp).toLocaleString()}</td>
                <td>
                  {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
                   <button
                    onClick={() => deleteRecord(record._id)}
                    className="delete-button text-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Result;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Result.css'; // Optional: For custom styling

function Result() {
  const [irrigationData, setIrrigationData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIrrigationData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/irrigation');
        setIrrigationData(response.data);
      } catch (err) {
        setError('Failed to load irrigation data.');
        console.error('Error fetching irrigation data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchIrrigationData();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

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
            </tr>
          </thead>
          <tbody>
            {irrigationData.map((record, index) => {
              // Convert field area from acres to square meters and depth from cm to meters
              const fieldAreaM2 = record.fieldArea * 4046.86;
              const fieldDepthM = record.fieldDepth / 100;

              // Calculate water irrigated as delta * field area * field depth
              const waterIrrigatedM3 = record.delta * fieldAreaM2 * fieldDepthM;
              console.log(waterIrrigatedM3);

              // Calculate water needed as water required minus water irrigated
              const waterNeeded = record.waterRequired - waterIrrigatedM3;

              return (
                <tr key={record._id || index}>
                  <td>{record.fieldArea}</td>
                  <td>{record.waterRequired?.toFixed(2) ?? 'N/A'}</td>
                  <td>{waterIrrigatedM3.toFixed(2)}</td>
                  <td>{waterNeeded.toFixed(2)}</td>
                  <td>{new Date(record.timestamp).toLocaleString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Result;

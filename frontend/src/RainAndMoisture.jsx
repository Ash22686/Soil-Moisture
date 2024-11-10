import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "./Rain.css";
import MotorButton from "./Motor";

ChartJS.register(ArcElement, Tooltip, Legend);

function RainAndMoisture() {
  const [moisture, setMoisture] = useState(null);
  const [startMoisture, setStartMoisture] = useState(null);
  const [stopMoisture, setStopMoisture] = useState(0);
  const [deltaMoisture, setDeltaMoisture] = useState(null);
  const [rainValue, setRainValue] = useState(-1);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [isRainStarted, setIsRainStarted] = useState(false);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const rainResponse = await axios.get(
          "https://api.thingspeak.com/channels/2704742/feeds.json?api_key=VDA0JYP5HJ6OTE77&results=1"
        );
        const moistureResponse = await axios.get(
          "https://api.thingspeak.com/channels/2701515/feeds.json?api_key=XO0IPO7N4Q0B8QXM&results=1"
        );

        const rainValue = rainResponse.data.feeds[0].field1;
        const currentMoisture = moistureResponse.data.feeds[0].field1;

        setRainValue(rainValue);
        setMoisture(currentMoisture);

        if (rainValue > 0 && !isRainStarted) {
          if (startMoisture === null) {
            console.log("Fetched moisture: ", currentMoisture);
            setStartMoisture(currentMoisture);
            setIsRainStarted(true);
          }
        } else if (rainValue <= 0 && isRainStarted) {
          setStopMoisture(currentMoisture);
          setIsRainStarted(false);
        }
      } catch (error) {
        console.error("Error fetching data from ThingSpeak", error);
      }

      setIsDataLoading(false);
    }, 5000);

    return () => clearInterval(interval);
  }, [isRainStarted, startMoisture]);

  useEffect(() => {
    console.log("Stop Moisture: ", stopMoisture);
    console.log("Start Moisture: ", startMoisture);

    if (stopMoisture && startMoisture !== null) {
      const delta = stopMoisture - startMoisture;
      setDeltaMoisture(delta);
      sendDeltaToBackend(delta); // Send delta to backend
    }
  }, [stopMoisture, startMoisture]);

  const sendDeltaToBackend = async (delta) => {
    try {
      await axios.post("http://localhost:5000/api/irrigation", { delta });
      console.log("Delta value sent to backend:", delta);
    } catch (error) {
      console.error("Error sending delta to backend:", error);
    }
  };

  const moistureData = {
    labels: ["Moisture", "Dry"],
    datasets: [
      {
        data: [moisture || 0, 100 - (moisture || 0)],
        backgroundColor: ["#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#36A2EB", "#FFCE56"],
      },
    ],
  };

  return (
    <div className="monitor-container flex gap-52 flex-wrap justify-center">
      <div className="moisture-data mr-32">
        <h2 className="text-3xl text-black font-semibold pb-6 mb-3">
          Soil Moisture Status
        </h2>
        {moisture ? (
          <div>
            <Pie data={moistureData} />
            <p className="text-black mt-8 ml-16">
              Soil Moisture Level: {moisture}%
            </p>
          </div>
        ) : (
          <p className="text-black">Loading moisture data...</p>
        )}
      </div>

      <div className="rain-status flex justify-center items-center flex-col mb-20 mr-24">
        <h2 className="text-3xl text-black font-semibold pb-6">Rain Status</h2>
        {!isDataLoading ? (
          // biome-ignore lint/a11y/useButtonType: <explanation>
<button
            className="rain-button mt-12"
            style={{
              backgroundColor: rainValue > 0 ? "#28a745" : "#dc3545",
              borderColor: rainValue > 0 ? "#28a745" : "#dc3545",
            }}
          >
            {rainValue > 0 ? "Raining" : "No Rain"}
          </button>
        ) : (
          <p className="text-black">Loading rain data...</p>
        )}
      </div>

      {/* Pass rainValue as prop to MotorButton */}
      <MotorButton rainValue={rainValue} />
    </div>
  );
}

export default RainAndMoisture;

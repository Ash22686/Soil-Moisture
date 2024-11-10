import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Motor.css";

function MotorButton({ rainValue }) {
  const [motorOn, setMotorOn] = useState(false);
  const [startMoisture, setStartMoisture] = useState(null);
  const [stopMoisture, setStopMoisture] = useState(null);
  const [deltaMotor, setDeltaMotor] = useState(null);

  // Function to fetch the current moisture level
  const fetchMoisture = async () => {
    try {
      const response = await axios.get(
        "https://api.thingspeak.com/channels/2701515/feeds.json?api_key=XO0IPO7N4Q0B8QXM&results=1"
      );
      return Number.parseFloat(response.data.feeds[0].field1);
    } catch (error) {
      console.error("Error fetching moisture data:", error);
      return null;
    }
  };

  

  // Manually toggle the motor and record moisture levels
  const toggleMotorManually = async () => {
    const currentMoisture = await fetchMoisture();
    setMotorOn((prevMotorState) => {
      const newMotorState = !prevMotorState;

      if (newMotorState) {
        // Motor turned on manually
        setStartMoisture(currentMoisture);
      } else {
        // Motor turned off manually
        setStopMoisture(currentMoisture);
      }

      return newMotorState;
    });
  };

  // Automatically turn off the motor if rain starts
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
    // biome-ignore lint/style/useTemplate: <explanation>
    console.log("rain value before : " + rainValue);
    // biome-ignore lint/style/useTemplate: <explanation>
    console.log("motor value before : " + motorOn);
    
    const handleRainEffectOnMotor = async () => {
      // biome-ignore lint/suspicious/noDoubleEquals: <explanation>
      if (rainValue == 1 && motorOn) {
        const currentMoisture = await fetchMoisture();
        setMotorOn(false); // Force motor off if rain starts
        setStopMoisture(currentMoisture); // Record stop moisture due to rain

        // biome-ignore lint/style/useTemplate: <explanation>
        console.log("rain value after : " + rainValue);
        // biome-ignore lint/style/useTemplate: <explanation>
        console.log("motor value after : " + motorOn);
      }
    };

    handleRainEffectOnMotor();
  }, [rainValue, motorOn]);

  // Calculate deltaMotor when both start and stop moisture levels are set
  useEffect(() => {
    
    if (startMoisture !== null && stopMoisture !== null) {
      const delta = stopMoisture - startMoisture;
      setDeltaMotor(delta);
      sendDeltaToBackend(delta);
    }
  }, [startMoisture, stopMoisture]);

  // Send deltaMotor to backend
  const sendDeltaToBackend = async (delta) => {
    try {
      await axios.post("http://localhost:5000/api/irrigation", { delta });
      console.log("Delta motor value sent to backend:", delta);
    } catch (error) {
      console.error("Error sending delta motor to backend:", error);
    }
  };

  return (
    <div className="motor-button-container">
      {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
<button
        className={`motor-button ${motorOn ? "on" : "off"}`}
        onClick={toggleMotorManually}
        disabled={rainValue === 1} // Disable button when it's raining
      >
        {motorOn ? "Motor ON" : "Motor OFF"}
      </button>
      {/* {deltaMotor !== null && <p>Delta Motor Value: {deltaMotor}</p>} */}
    </div>
  );
}

export default MotorButton;
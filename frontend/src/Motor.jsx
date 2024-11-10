import React, { useEffect, useState } from "react";
import "./Motor.css"; // Optional: For styling

function MotorButton({ rainValue }) {
  const [motorOn, setMotorOn] = useState(false);

  // Toggle motor on or off manually
  const toggleMotor = () => {
    setMotorOn((prev) => !prev);
  };

  // Automatically turn the motor on or off based on the rain value
  useEffect(() => {
    if (rainValue > 0) {
      setMotorOn(false); // Turn motor on if rain is detected
    } else {
      setMotorOn(true); // Turn motor off if no rain
    }
  }, [rainValue]);

  return (
    <div className="motor-button-container">
      {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
<button
        className={`motor-button ${motorOn ? "on" : "off"}`}
        onClick={toggleMotor}
      >
        {motorOn ? "Motor ON" : "Motor OFF"}
      </button>
    </div>
  );
}

export default MotorButton;

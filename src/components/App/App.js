import { useState } from "react";
import Timer from "../Timer/Timer";

import "./App.scss";

const initialTimeValue = {
  minute: 0,
  second: 0,
};

function App() {
  const [time, setTime] = useState(initialTimeValue);

  return (
    <div className="app">
      <Timer
        minuteInput={parseInt(time.minute)}
        secondInput={parseInt(time.second)}
      />
      <div className="input">
        <div className="input--wrapper">
          <label>Minute</label>
          <input
            className="input--minute input--field"
            name="minute"
            placeholder="Minute"
            value={time.minute}
            onChange={(e) => {
              setTime((prev) => {
                if (Number.isInteger(parseInt(e.target.value)))
                  return {
                    ...prev,
                    minute: e.target.value,
                  };
                else {
                  return {
                    ...prev,
                    minute: "",
                  };
                }
              });
            }}
          />
        </div>

        <div className="input--wrapper">
          <label>Second</label>
          <input
            className="input--second input--field"
            name="second"
            placeholder="Second"
            value={time.second}
            onChange={(e) => {
              setTime((prev) => {
                if (
                  Number.isInteger(parseInt(e.target.value)) &&
                  parseInt(e.target.value) <= 60
                )
                  return {
                    ...prev,
                    second: e.target.value,
                  };
                else {
                  return {
                    ...prev,
                    second: "",
                  };
                }
              });
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;

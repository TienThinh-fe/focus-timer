import React, { useState, useEffect } from "react";

import "./Timer.scss";

function Timer({ minuteInput, secondInput }) {
  const [minutes, setMinutes] = useState(parseInt(minuteInput));
  const [seconds, setSeconds] = useState(parseInt(secondInput));
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setMinutes(minuteInput);
    setSeconds(secondInput);
  }, [minuteInput, secondInput]);

  function toggle() {
    setIsActive(!isActive);
    if (isTimeUp) {
      setMinutes(minuteInput);
      setSeconds(secondInput);
    }
    setIsTimeUp(false);
  }

  function reset() {
    setSeconds(secondInput);
    setMinutes(minuteInput);
    setIsActive(false);
    setIsTimeUp(false);
  }

  function setProgressBar() {
    let inputTime = minuteInput * 60 + secondInput;
    let currentTime = minutes * 60 + seconds;

    console.log("input time: ", inputTime);
    console.log("current time: ", currentTime);
    console.log(`minute: ${minutes}, second: ${seconds}`);

    let percent = 100 - (currentTime / inputTime) * 100;

    console.log("percent: ", percent);

    if (percent <= 100) {
      setProgress(percent);
    }
  }

  function checkTimeUp() {
    if (minutes < 0 || seconds < 0) {
      setIsTimeUp(true);
    }
  }

  function checkNaN() {
    if (!Number.isInteger(minuteInput)) {
      setMinutes(0);
    }

    if (!Number.isInteger(secondInput)) {
      setSeconds(0);
    }
  }

  useEffect(() => {
    let interval = null;

    setProgressBar();
    checkTimeUp();
    checkNaN();

    if (isTimeUp) {
      setIsActive(false);
    }

    if (isActive && !isTimeUp) {
      interval = setInterval(() => {
        if (seconds === 0) {
          setSeconds(59);
          setMinutes((minutes) => minutes - 1);
        } else {
          setSeconds((seconds) => seconds - 1);
        }
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, minutes, seconds]);

  return (
    <>
      <div className="time--wrapper">
        <div className={`time ${isTimeUp ? "time--up" : ""}`}>
          {isTimeUp ? "BREAK TIME" : `${minutes}:${seconds}`}
        </div>
        <div className="button-wrapper">
          <button className="btn btn--toggle" onClick={toggle}>
            {isActive ? "Pause" : "Start"}
          </button>
          <button className="btn btn--reset" onClick={reset}>
            Reset
          </button>
        </div>
      </div>
      <div className="progress" style={{ width: `${progress}%` }}></div>
    </>
  );
}

export default Timer;

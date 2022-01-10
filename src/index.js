import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App/App";

import "./reset.scss";
import "./index.scss";

ReactDOM.render(
  <React.StrictMode>
    <div className="wrap">
      <App />
    </div>
  </React.StrictMode>,
  document.getElementById("root")
);

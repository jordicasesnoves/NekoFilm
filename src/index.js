import React from "react";
import ReactDOM from "react-dom";

// Import tailwindcss postcss's build
import "./assets/main.css";
// Import AnimateCSS library
import "./assets/animate.css";

import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

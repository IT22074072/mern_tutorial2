import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { WorkoutsContextProvider } from "./context/WokoutContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <WorkoutsContextProvider>
      <App />  {/*children of WorkoutsContextProvider*/}
    </WorkoutsContextProvider>
  </React.StrictMode>
);

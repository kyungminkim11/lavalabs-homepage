import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import HomeApp from "./HomeApp";
import "./styles.css";
import "./enhancements.css";
import "./performance.css";
import "./home-upgrades.css";

const path = window.location.pathname.toLowerCase();
const showStaticPage = path.includes("/terms") || path.includes("/privacy") || path.includes("/soft_moon");

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {showStaticPage ? <App /> : <HomeApp />}
  </React.StrictMode>
);

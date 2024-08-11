import React from "react";
import App from "../src/App.jsx";
import { createRoot } from "react-dom/client";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(<App />);

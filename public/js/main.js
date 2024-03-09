import React from "react";
import { createRoot } from "react-dom/client";

import App from "./react-comp/App.jsx";

const root = createRoot(document.getElementById("mainreactroot"));
root.render(
    <App />
);
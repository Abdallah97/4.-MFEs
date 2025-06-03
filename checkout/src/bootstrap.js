import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import Checkout from "./Checkout.jsx";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Checkout />
  </StrictMode>
);

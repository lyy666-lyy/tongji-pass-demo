import React from "react";
import { createRoot } from "react-dom/client";
import App from "./app.jsx";   // 注意大小写与文件名一致

createRoot(document.getElementById("root")).render(<App />);

import './index.css';

import React from "react";
import App from "./App";

import './i18n';

// Configuring React-Router
import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
const root = createRoot(container);


root.render(
    <App />
);



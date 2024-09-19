// src/index.tsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import SearchKitApp from './searchkit-app/App';

const appName = process.env.REACT_APP_APP_NAME;
let App = SearchKitApp;

// Given that you have another app, you can add it here.
// if (appName === 'searchkit_app2') {
//   App = SearchKitApp2;
// }

const container = document.getElementById('root');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(<App />);

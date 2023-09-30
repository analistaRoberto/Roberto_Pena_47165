import React from 'react';
import ReactDOM from 'react-dom/client';
import { ContextCart } from "./context/ContextCart.jsx";
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextCart>
      <App />
    </ContextCart>
  </React.StrictMode>
);

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { GlobalStorage } from './hooks/GlobalContext .jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <GlobalStorage>
    <App />
  </GlobalStorage>,
);

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css'
import "react-toastify/dist/ReactToastify.css"
import { BrowserRouter } from 'react-router-dom';
import './styles/reset.css'
import './styles/fonts.css'
import './styles/variables.css'
import './styles/helpers.css'
import './styles/defaults.css'
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
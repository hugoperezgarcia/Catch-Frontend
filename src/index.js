import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals'
import {BrowserRouter as Router} from 'react-router-dom';
import { UserProvider } from './context/user';
import { AxiosProvider } from './context/axiosContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AxiosProvider>
    <UserProvider>
      <Router>
        <App />
      </Router>
    </UserProvider>
    </AxiosProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

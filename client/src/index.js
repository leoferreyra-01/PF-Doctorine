import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import store from './redux/store.js';
import reportWebVitals from './reportWebVitals';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

axios.defaults.baseURL = process.env.REACT_APP_API || `http://localhost:3001`;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <App />
        </MuiPickersUtilsProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

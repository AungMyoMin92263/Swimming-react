import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Axios from 'axios';
import { configureStore } from '@reduxjs/toolkit'
import { reducers } from './stores/reducers';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
Axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
Axios.defaults.baseURL = process.env.REACT_APP_API_ENDPOINT;
// const composeEnhansers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(reducers, composeEnhansers(applyMiddleware(thunk)));
const storeNew = configureStore({ reducer: reducers, middleware: (getDefaultMiddleware) => getDefaultMiddleware() })


root.render(
  <Provider store={storeNew}>
    <App></App>
  </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

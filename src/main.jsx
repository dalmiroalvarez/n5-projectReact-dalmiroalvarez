import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/App.scss'
import './styles/index.scss';
import { Provider } from 'react-redux';
import store from '../src/app/store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);


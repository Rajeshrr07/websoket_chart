import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import startMockServer from './mock/mockWebSocketServer';


if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'production') {
  startMockServer();
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

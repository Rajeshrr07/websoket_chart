import React from 'react';
import Dashboard from '../src/Pages/Dashboard.jsx';
import DetailsPage from './Pages/Details.jsx';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/details" element={<DetailsPage />} />
    </Routes>
  </Router>

  );
}

export default App;

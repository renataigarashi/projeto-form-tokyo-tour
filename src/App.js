import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './screens/Home.js';
import Files from './screens/Files.js';


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Files" element={<Files />} />
        </Routes>
      </Router></>
  );
}

export default App;
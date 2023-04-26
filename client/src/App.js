import './App.css';

import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Landing from './components/LandingPage/Landing.jsx';
import Home from './components/Home/Home.jsx';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} ></Route>
        <Route path="/home" element={<Home />} ></Route>
        {/* <Route></Route> */}
        {/* <Route></Route> */}
        {/* <Route></Route> */}
      </Routes>
    </div>
  );
}

export default App;

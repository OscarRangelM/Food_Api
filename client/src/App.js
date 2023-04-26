import './App.css';

import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Landing from './components/LandingPage/Landing.jsx';
import Home from './components/Home/Home.jsx';
import Detail from './components/DetailPage/Detail.jsx';
import Form from './components/CreateRecipe/Form.jsx';
import Favorites from './components/Favorites/Favorites.jsx';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} ></Route>
        <Route path="/home" element={<Home />} ></Route>
        <Route path="/detail/:detailId" element={<Detail />} ></Route>
        <Route path="/createRecipe" element={<Form />} ></Route>
        <Route path="/favorites" element={<Favorites />} ></Route>
      </Routes>
    </div>
  );
}

export default App;

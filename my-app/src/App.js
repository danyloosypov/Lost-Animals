import './App.css';
import react, {useState, useEffect} from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from './pages/Login';
import Registration from './pages/Registration';


function App() {

  return (
    <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />}>
            </Route>
            <Route path="/register" element={<Registration />}>
            </Route> 
          </Routes>
      </BrowserRouter>
  );
}

export default App;

import './App.css';
import React, {useState, useEffect} from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from './pages/Login';
import Registration from './pages/Registration';
import AccountPage from './pages/AccountPage';
import CreatePost from './pages/CreatePost';
import FoundPage from './pages/FoundPage';
import HomePage from './pages/HomePage';
import LostPage from './pages/LostPage';
import Header from './partials/Header';
import Footer from './partials/Footer';
import Layout from './components/Layout';


function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
                <Login /> 
            }
          />
          <Route
            path="/register"
            element={
                <Registration /> 
            }
          />
          <Route
            path="/"
            element={
              <Layout>
                <HomePage /> {/* HomePage component */}
              </Layout>
            }
          />
          <Route
            path="/lost-animals"
            element={
              <Layout>
                <LostPage /> {/* HomePage component */}
              </Layout>
            }
          />

          <Route
            path="/found-animals"
            element={
              <Layout>
                <FoundPage /> {/* HomePage component */}
              </Layout>
            }
          />


          
          <Route
            path="/my-account"
            element={
              <Layout>
                <AccountPage /> {/* HomePage component */}
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

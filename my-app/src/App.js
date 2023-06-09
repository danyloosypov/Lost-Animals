import './App.css';
import React, {useState, useEffect} from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from './pages/Login';
import Registration from './pages/Registration';
import AccountPage from './pages/AccountPage';
import PostForm from './pages/PostForm';
import FoundPage from './pages/FoundPage';
import EditPostForm from './pages/EditPostForm';
import HomePage from './pages/HomePage';
import LostPage from './pages/LostPage';
import PostPage from './pages/PostPage';
import Header from './partials/Header';
import Footer from './partials/Footer';
import Layout from './components/Layout';
import AdminHomePage from './pages/admin/AdminHomePage';
import EditAnimal from './pages/admin/EditAnimal';
import AdminLogin from './pages/admin/AdminLogin';


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
            path="/admin-login"
            element={
                <AdminLogin /> 
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
            path="/post-form"
            element={
              <Layout>
                <PostForm /> {/* HomePage component */}
              </Layout>
            }
          />

          <Route
            path="/edit-post/:id"
            element={
              <Layout>
                <EditPostForm /> {/* HomePage component */}
              </Layout>
            }
          />
          
          <Route
            path="/edit-animal/:id"
            element={
              <Layout>
                <EditAnimal /> {/* HomePage component */}
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

          <Route
            path="/admin-site"
            element={
                <AdminHomePage /> 
            }
          />


          <Route
            path="/post/:id"
            element={
              <Layout>
                <PostPage /> {/* HomePage component */}
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

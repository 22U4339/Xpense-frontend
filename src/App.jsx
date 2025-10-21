import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route,Link } from 'react-router-dom';
import Home from './components/Home';
import Transaction from './components/Transaction';
import NotFound from './components/NotFound';
import AddForm from './components/AddForm';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import ProtectedRoute from './components/ProctectedRoute';
import Welcome from './components/Welcome';
import NavBar from './components/NavBar';
import ChangePasswordPage from './components/changePasswordPage';


function App() {
  
  return (<>
    <Router>
        <Routes>
        <Route path='/' element={<NavBar> <Welcome/></NavBar> } />
        <Route path="/login" element={<NavBar><LoginPage /></NavBar> } />
        <Route path="/signup" element={<NavBar> <SignupPage /> </NavBar>} />

         {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<NavBar><Home /></NavBar>} />
          <Route path="/transaction/:id" element={<NavBar><Transaction /></NavBar> } />
          <Route path="/add" element={<NavBar><AddForm /></NavBar>}/>
          <Route path='change-password' element={<NavBar><ChangePasswordPage/></NavBar>} />
        </Route>


        {/* 404 fallback */}
        <Route path="*" element={<NavBar><NotFound /></NavBar>} />
      </Routes>
      
    </Router>
  </>)
  
}

export default App;

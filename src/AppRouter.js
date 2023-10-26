import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; 
import Home from './components/home';
import Main from './components/main';
import Login from './components/login';
import LoggedHome from './components/loggedhome';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/main" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/home" />} /> 
        <Route path="/loggedhome" element={<LoggedHome />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;


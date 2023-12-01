import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; 
import Home from './components/home';
import Main from './components/main';
import Login from './components/login';
import LoggedHome from './components/loggedhome';
import Article1 from './components/article1';
import Article2 from './components/article2';
import Mybooks from './components/mybooks'; 

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/main" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/home" />} /> 
        <Route path="/loggedhome" element={<LoggedHome />} />
        <Route path="/article1" element={<Article1 />} /> {/* Trasa do artykułu 1 */}
        <Route path="/article2" element={<Article2 />} /> {/* Trasa do artykułu 2 */}
        <Route path="/mybooks" element={<Mybooks />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;


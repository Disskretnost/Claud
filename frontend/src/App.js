import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/Login/Login';
import RegistrationPage from './pages/Signup/Signup';
import HomePage from './pages/Home/Home'; 

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/registration" element={<RegistrationPage />} />
                <Route path="/" element={<HomePage />} /> 
            </Routes>
        </Router>
    );
}

export default App;

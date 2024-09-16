import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Home.jsx';
import ElectionPage from './pages/ElectionPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import CandidatePage from './pages/CandidatePage.jsx';
import DetailsPage from './pages/DetailsPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import AdminLogin from './components/AdminLogin.jsx';

// Import both AuthProvider and AdminAuthProvider
import { AuthProvider } from './utils/AuthContext.js';
import { AdminAuthProvider } from './utils/AdminAuthContext.js';

function App() {
  return (
    <AuthProvider>
      <AdminAuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/election" element={<ElectionPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/adminlogin" element={<AdminLogin />} /> {/* Admin route */}
            <Route path="/details" element={<DetailsPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path='/admincontrols' element={<CandidatePage />} />
            {/* <Route path="/" element={}/> */}
            {/* Add other routes here */}
          </Routes>
        </Router>
      </AdminAuthProvider>
    </AuthProvider>
  );
}

export default App;

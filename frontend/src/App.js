import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Home.jsx';
import ElectionPage from './pages/ElectionPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import AdminPage from './pages/AdminPage.jsx';
import DetailsPage from './pages/DetailsPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';

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
            <Route path="/admincontrol" element={<AdminPage />} /> {/* Admin route */}
            <Route path="/details" element={<DetailsPage />} />
            <Route path="/register" element={<RegisterPage />} />
            {/* Add other routes here */}
          </Routes>
        </Router>
      </AdminAuthProvider>
    </AuthProvider>
  );
}

export default App;

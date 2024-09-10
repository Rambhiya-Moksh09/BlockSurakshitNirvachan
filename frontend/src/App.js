import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Home.jsx';
import ElectionPage from './pages/ElectionPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import AdminPage from './pages/AdminPage.jsx'
import DetailsPage from './pages/DetailsPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import { AuthProvider } from './utils/AuthContext.js';
function App() {
  return (
    <AuthProvider >
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/election" element={<ElectionPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admincontrol" element={<AdminPage />} />
          <Route path="/details" element={<DetailsPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Add other routes here */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

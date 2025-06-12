import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { ToastProvider } from './components/ToastContainer';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ViewData from './pages/ViewData';
import About from './pages/About';

// App component manages global state, dark mode, and routing
function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
      <ToastProvider>
        <Router>
          <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          <Routes>
            <Route path="/" element={<About />} />
            <Route path="/add" element={<Home />} />
            <Route path="/view" element={<ViewData />} />
          </Routes>
        </Router>
      </ToastProvider>
    </div>
  );
}

export default App;
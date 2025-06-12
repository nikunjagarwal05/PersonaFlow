import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Database, Moon, Sun, Users, Info, Globe } from 'lucide-react';

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const location = useLocation();

  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center h-16 w-full px-4">
        {/* Left side */}
        <div className="flex items-center space-x-3 min-w-[220px]">
          <div className="p-2 bg-accent dark:bg-darkaccent rounded-lg">
            <Users className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-extrabold text-accent dark:text-darkaccent-light tracking-tight">
            PersonaFlow
          </h1>
        </div>

        {/* Center Links */}
        <div className="hidden md:flex items-center space-x-6">
          <Link
            to="/"
            className={`px-4 py-2 rounded-md font-semibold flex items-center space-x-2 ${
              location.pathname === '/'
                ? 'bg-accent dark:bg-darkaccent text-white shadow-md'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <Info className="w-4 h-4" />
            <span>About</span>
          </Link>
          <Link
            to="/add"
            className={`px-4 py-2 rounded-md font-semibold flex items-center space-x-2 ${
              location.pathname === '/add'
                ? 'bg-accent dark:bg-darkaccent text-white shadow-md'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <Home className="w-4 h-4" />
            <span>Add User</span>
          </Link>
          <Link
            to="/view"
            className={`px-4 py-2 rounded-md font-semibold flex items-center space-x-2 ${
              location.pathname === '/view'
                ? 'bg-accent dark:bg-darkaccent text-white shadow-md'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>View Users</span>
          </Link>
        </div>

        <div className='flex justify-center items-center gap-4'>
          {/* Right Side - Dark Mode + Google Translate */}
          <div className="flex items-center space-x-3">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-md bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </button>
          </div>

          <div className="relative">
            <div id="google_translate_element"></div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

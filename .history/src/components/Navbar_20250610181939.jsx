import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Database, Moon, Sun, Users, Info } from 'lucide-react';

// Navbar component provides navigation and dark mode toggle
const Navbar = ({ darkMode, toggleDarkMode }) => {
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center h-16 w-full">
          
          {/* App Name at far left */}
          <div className="flex items-centermin-w-[220px]">
            
            <div className="p-2 bg-accent dark:bg-darkaccent rounded-lg">
              <Users className="w-6 h-6 text-white" />
            </div>
            
            <h1 className="ml-3 text-2xl font-extrabold text-accent dark:text-darkaccent-light tracking-tight select-none">
              PersonaFlow
            </h1>
          </div>

          {/* Nav Links Centered */}
          <div className="flex-1 sm: flex justify-center">
            <div className="flex items-baseline space-x-6">
              <Link
                to="/"
                className={`px-4 py-2 rounded-md font-semibold transition-all duration-200 flex items-center space-x-2 ${
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
                className={`px-4 py-2 rounded-md font-semibold transition-all duration-200 flex items-center space-x-2 ${
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
                className={`px-4 py-2 rounded-md font-semibold transition-all duration-200 flex items-center space-x-2 ${
                  location.pathname === '/view'
                    ? 'bg-accent dark:bg-darkaccent text-white shadow-md'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <Database className="w-4 h-4" />
                <span>View Users</span>
              </Link>
            </div>
          </div>

          {/* Theme Toggle at far right */}
          <div className="flex items-center justify-end min-w-[60px]">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-md bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-gray-200 dark:border-gray-700">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link
            to="/"
            className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-200 flex items-center space-x-2 ${
              location.pathname === '/'
                ? 'bg-accent dark:bg-darkaccent text-white'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <Info className="w-4 h-4" />
            <span>About</span>
          </Link>
          <Link
            to="/add"
            className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-200 flex items-center space-x-2 ${
              location.pathname === '/add'
                ? 'bg-accent dark:bg-darkaccent text-white'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <Home className="w-4 h-4" />
            <span>Add User</span>
          </Link>
          <Link
            to="/view"
            className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-200 flex items-center space-x-2 ${
              location.pathname === '/view'
                ? 'bg-accent dark:bg-darkaccent text-white'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>View Users</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
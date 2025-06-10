import React from 'react';
import { Search, X, Calendar, Filter } from 'lucide-react';

const SearchBar = ({ searchQuery, onSearchChange, dateFilter, onDateFilterChange, onClearFilters, totalResults }) => {
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1 relative">
          
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>

          <input
            type="text" placeholder="Search by name or email..." value={searchQuery} onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"/>
        </div>

        {/* Date Filter */}
        <div className="relative">
          
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Calendar className="h-5 w-5 text-gray-400" />
          </div>

          <input
            type="date" value={dateFilter} onChange={(e) => onDateFilterChange(e.target.value)}
            className="w-full lg:w-48 pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white"/>
        </div>

        {/* Clear Filters Button */}
        {(searchQuery || dateFilter) && (
          <button
            onClick={onClearFilters}
            className="flex items-center space-x-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <X className="w-4 h-4" />
            <span className="hidden sm:inline">Clear</span>
          </button>
        )}
      </div>

      {/* Results Counter */}
      {totalResults !== undefined && (
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <Filter className="w-4 h-4" />
            <span>
              {totalResults} {totalResults === 1 ? 'result' : 'results'} found
            </span>
          </div>
          {(searchQuery || dateFilter) && (
            <div className="text-sm text-gray-500 dark:text-gray-500">
              {searchQuery && (
                <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2 py-1 rounded-md mr-2">
                  "{searchQuery}"
                </span>
              )}
              {dateFilter && (
                <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-2 py-1 rounded-md">
                  DOB: {new Date(dateFilter).toLocaleDateString()}
                </span>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
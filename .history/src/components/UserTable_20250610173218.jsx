// UserTable component: displays a table of users with sorting, editing, and deleting functionality
// Props: users (array), onEdit (function), onDelete (function), onSort (function), sortField (string), sortDirection (string)


import React, { useState } from 'react';
import { Edit2, Trash2, ArrowUpDown, ArrowUp, ArrowDown, Users } from 'lucide-react';

const UserTable = ({
  users,
  onEdit,
  onDelete,
  onSort,
  sortField,
  sortDirection,
}) => {
  const [hoveredRow, setHoveredRow] = useState(null);

  // Helper to show the correct sort icon
  const getSortIcon = (field) => {
    if (sortField !== field) {
      return <ArrowUpDown className="w-4 h-4 text-gray-400" />;
    }
    return sortDirection === 'asc' 
      ? <ArrowUp className="w-4 h-4 text-blue-500" />
      : <ArrowDown className="w-4 h-4 text-blue-500" />;
  };

  // Handle sorting when a column header is clicked
  const handleSort = (field) => {
    const newDirection = sortField === field && sortDirection === 'asc' ? 'desc' : 'asc';
    onSort(field, newDirection);
  };

  // Show a message if there are no users
  if (users.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-16 shadow-sm text-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="p-6 bg-gray-100 dark:bg-gray-700 rounded-full">
            <Users className="w-16 h-16 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">No Users Found</h3>
          <p className="text-gray-600 dark:text-gray-400 max-w-md">
            It looks like there are no users matching your criteria. Try adjusting your search or add some users to get started.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                #
              </th>
              <th 
                className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                onClick={() => handleSort('fullName')}
              >
                <div className="flex items-center space-x-2">
                  <span>Name</span>
                  {getSortIcon('fullName')}
                </div>
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Phone
              </th>
              <th 
                className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                onClick={() => handleSort('dateOfBirth')}
              >
                <div className="flex items-center space-x-2">
                  <span>Date of Birth</span>
                  {getSortIcon('dateOfBirth')}
                </div>
              </th>
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {users.map((user, index) => (
              <tr
                key={user.id}
                className={`transition-all duration-200 ${
                  hoveredRow === user.id
                    ? 'bg-blue-50 dark:bg-blue-900/20'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
                }`}
                onMouseEnter={() => setHoveredRow(user.id)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-full text-white text-sm font-medium">
                    {index + 1}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className="h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-gray-700 dark:text-gray-300 font-medium">
                        {user.fullName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {user.fullName}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 dark:text-white">{user.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 dark:text-white">
                    <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-xs font-medium mr-1">
                      {user.countryCode}
                    </span>
                    {user.phoneNumber}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 dark:text-white">
                    {new Date(user.dateOfBirth).toLocaleDateString()}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Age: {Math.floor((Date.now() - new Date(user.dateOfBirth).getTime()) / (365.25 * 24 * 60 * 60 * 1000))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-2">
                    <button
                      onClick={() => onEdit(user)}
                      className="p-2 bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-md transition-all duration-200"
                      title="Edit user"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(user.id)}
                      className="p-2 bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 rounded-md transition-all duration-200"
                      title="Delete user"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable; 
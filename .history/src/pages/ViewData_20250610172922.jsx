import React, { useState, useEffect, useMemo } from 'react';
import UserTable from '../components/UserTable';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import Modal from '../components/Modal';
import UserForm from '../components/UserForm';
import {cgetDataFromLocalStorage,
  deleteDataById, editDataById, clearAllData, exportToCSV,
} from '../utils/localStorage';
import { useToast } from '../components/ToastContainer';
import { Download, Trash, Database, TrendingUp, Users, Clock } from 'lucide-react';

const ViewData = () => {
  const { showToast } = useToast();
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [sortField, setSortField] = useState('createdAt');
  const [sortDirection, setSortDirection] = useState('desc');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    const loadedUsers = getDataFromLocalStorage();
    setUsers(loadedUsers);
  };

  const filteredAndSortedUsers = useMemo(() => {
    let filtered = users.filter(user => {
      const matchesSearch = 
        user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesDate = !dateFilter || user.dateOfBirth === dateFilter;
      
      return matchesSearch && matchesDate;
    });

    // Sort users
    filtered.sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];
      
      if (sortField === 'createdAt' || sortField === 'updatedAt' || sortField === 'dateOfBirth') {
        aVal = new Date(aVal).getTime();
        bVal = new Date(bVal).getTime();
      }
      
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }
      
      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [users, searchQuery, dateFilter, sortField, sortDirection]);

  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedUsers.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedUsers, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredAndSortedUsers.length / itemsPerPage);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleDelete = (id) => {
    const user = users.find(u => u.id === id);
    setSelectedUser(user || null);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedUser) {
      const success = deleteDataById(selectedUser.id);
      if (success) {
        loadUsers();
        showToast({
          type: 'success',
          title: 'User Deleted',
          message: `${selectedUser.fullName} has been removed from the database.`,
        });
        // Reset to first page if current page becomes empty
        if (paginatedUsers.length === 1 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      } else {
        showToast({
          type: 'error',
          title: 'Delete Failed',
          message: 'Failed to delete the user. Please try again.',
        });
      }
    }
    setIsDeleteModalOpen(false);
    setSelectedUser(null);
  };

  const handleEditSubmit = (userData) => {
    if (selectedUser) {
      const updatedUser = editDataById(selectedUser.id, userData);
      if (updatedUser) {
        loadUsers();
        showToast({
          type: 'success',
          title: 'User Updated',
          message: `${updatedUser.fullName}'s information has been updated.`,
        });
        setIsEditModalOpen(false);
        setSelectedUser(null);
      } else {
        showToast({
          type: 'error',
          title: 'Update Failed',
          message: 'Failed to update the user. Please try again.',
        });
      }
    }
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to delete all users? This action cannot be undone.')) {
      clearAllData();
      loadUsers();
      setCurrentPage(1);
      showToast({
        type: 'warning',
        title: 'All Data Cleared',
        message: 'All user records have been permanently deleted.',
      });
    }
  };

  const handleExport = () => {
    try {
      exportToCSV();
      showToast({
        type: 'success',
        title: 'Export Successful',
        message: 'User data has been exported to CSV file.',
      });
    } catch (error) {
      showToast({
        type: 'error',
        title: 'Export Failed',
        message: 'Failed to export data. Please try again.',
      });
    }
  };

  const handleSort = (field, direction) => {
    setSortField(field);
    setSortDirection(direction);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setDateFilter('');
    setCurrentPage(1);
  };

  const stats = useMemo(() => {
    const totalUsers = users.length;
    const avgAge = users.length > 0 
      ? Math.round(users.reduce((sum, user) => {
          const age = Math.floor((Date.now() - new Date(user.dateOfBirth).getTime()) / (365.25 * 24 * 60 * 60 * 1000));
          return sum + age;
        }, 0) / users.length)
      : 0;
    
    const recentUsers = users.filter(user => {
      const createdDate = new Date(user.createdAt);
      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      return createdDate > weekAgo;
    }).length;

    return { totalUsers, avgAge, recentUsers };
  }, [users]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="p-4 bg-blue-600 rounded-lg shadow-md">
              <Database className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            User Database
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Manage and explore your user data with advanced filtering, sorting, and export capabilities.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalUsers}</div>
                <div className="text-blue-600 dark:text-blue-400">Total Users</div>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.avgAge}</div>
                <div className="text-green-600 dark:text-green-400">Average Age</div>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.recentUsers}</div>
                <div className="text-purple-600 dark:text-purple-400">This Week</div>
              </div>
              <Clock className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Controls Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-6">
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleExport}
                disabled={users.length === 0}
                className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-medium px-6 py-3 rounded-md transition-all duration-200 shadow-sm hover:shadow-md disabled:cursor-not-allowed"
              >
                <Download className="w-5 h-5" />
                <span>Export CSV</span>
              </button>
              <button
                onClick={handleClearAll}
                disabled={users.length === 0}
                className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-medium px-6 py-3 rounded-md transition-all duration-200 shadow-sm hover:shadow-md disabled:cursor-not-allowed"
              >
                <Trash className="w-5 h-5" />
                <span>Clear All</span>
              </button>
            </div>
          </div>

          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            dateFilter={dateFilter}
            onDateFilterChange={setDateFilter}
            onClearFilters={handleClearFilters}
            totalResults={filteredAndSortedUsers.length}
          />
        </div>

        {/* Table Section */}
        <div className="mb-8">
          <UserTable
            users={paginatedUsers}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onSort={handleSort}
            sortField={sortField}
            sortDirection={sortDirection}
          />
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            itemsPerPage={itemsPerPage}
            totalItems={filteredAndSortedUsers.length}
          />
        )}

        {/* Edit Modal */}
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedUser(null);
          }}
          title="Edit User"
          size="lg"
        >
          {selectedUser && (
            <UserForm
              initialData={selectedUser}
              onSubmit={handleEditSubmit}
              onCancel={() => {
                setIsEditModalOpen(false);
                setSelectedUser(null);
              }}
              isEditing={true}
            />
          )}
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setSelectedUser(null);
          }}
          title="Confirm Delete"
        >
          {selectedUser && (
            <div className="space-y-6">
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <p className="text-gray-800 dark:text-gray-200">
                  Are you sure you want to delete <strong>{selectedUser.fullName}</strong>?
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  This action cannot be undone and will permanently remove all user data.
                </p>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setIsDeleteModalOpen(false);
                    setSelectedUser(null);
                  }}
                  className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-md transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  Delete User
                </button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default ViewData;
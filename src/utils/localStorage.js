const STORAGE_KEY = 'professional_users';

// Utility functions for managing user data and drafts in localStorage

export const getDataFromLocalStorage = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return [];
  }
};

export const setDataToLocalStorage = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error writing to localStorage:', error);
  }
};

export const addUserToLocalStorage = (user) => {
  const users = getDataFromLocalStorage();
  const newUser = {
    ...user,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  users.push(newUser);
  setDataToLocalStorage(users);
  return newUser;
};

export const deleteDataById = (id) => {
  const users = getDataFromLocalStorage();
  const filteredUsers = users.filter(user => user.id !== id);
  
  if (filteredUsers.length !== users.length) {
    setDataToLocalStorage(filteredUsers);
    return true;
  }
  return false;
};

export const editDataById = (id, updatedData) => {
  const users = getDataFromLocalStorage();
  const userIndex = users.findIndex(user => user.id === id);
  
  if (userIndex !== -1) {
    users[userIndex] = {
      ...users[userIndex],
      ...updatedData,
      updatedAt: new Date().toISOString(),
    };
    setDataToLocalStorage(users);
    return users[userIndex];
  }
  return null;
};

export const clearAllData = () => {
  localStorage.removeItem(STORAGE_KEY);
};

export const exportToCSV = () => {
  const users = getDataFromLocalStorage();
  if (users.length === 0) return;

  const headers = ['ID', 'Full Name', 'Email', 'Country Code', 'Phone Number', 'Date of Birth', 'Created At'];
  const csvContent = [
    headers.join(','),
    ...users.map(user => [
      user.id,
      `"${user.fullName}"`,
      user.email,
      user.countryCode,
      user.phoneNumber,
      user.dateOfBirth,
      new Date(user.createdAt).toLocaleDateString()
    ].join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `users_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const DRAFT_KEY = 'form_draft';

export const saveDraft = (formData) => {
  try {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(formData));
  } catch (error) {
    console.error('Error saving draft:', error);
  }
};

export const getDraft = () => {
  try {
    const draft = localStorage.getItem(DRAFT_KEY);
    return draft ? JSON.parse(draft) : null;
  } catch (error) {
    console.error('Error reading draft:', error);
    return null;
  }
};

export const clearDraft = () => {
  localStorage.removeItem(DRAFT_KEY);
};
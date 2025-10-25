import api from './api';

export const authService = {
  login: async (email, password) => {
    const response = await api.post('/accounts/login/', { email, password });
    return response.data;
  },

  register: async (userData) => {
    const response = await api.post('/accounts/register/', userData);
    return response.data;
  },

  logout: async () => {
    const response = await api.post('/accounts/logout/');
    return response.data;
  },

  getProfile: async () => {
    const response = await api.get('/accounts/dashboard/');
    return response.data;
  },

  updateProfile: async (profileData) => {
    const response = await api.put('/accounts/profile/', profileData);
    return response.data;
  },

  changePassword: async (passwordData) => {
    const response = await api.post('/accounts/change-password/', passwordData);
    return response.data;
  }
};
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://localhost:7014', 
  headers: {
    'Content-Type': 'application/json'
  }
});

export default {
  register(user) {
    return apiClient.post('/User/register', user);
  },
  login(credentials) {
    return apiClient.post('/User/login', credentials);
  },
  getUsers(token) {
    return apiClient.get('/User/users', {
      headers: { Authorization: `Bearer ${token}` }
    });
  },
  getCurrentUser(token) {
    return apiClient.get('/User/current', {
      headers: { Authorization: `Bearer ${token}` }
    });
  },
  deleteUser(id, token) {
    return apiClient.delete(`/User/delete/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  
};

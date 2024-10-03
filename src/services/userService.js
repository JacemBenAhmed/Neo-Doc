import axios from 'axios';

const API_URL = 'https://neodocs.azurewebsites.net/User'; 

export default {
  async getUsers() {
    try {
      const response = await axios.get(`${API_URL}/users`);
      return response;
    } catch (error) {
      throw new Error(`Error fetching user: ${error.message}`);
    }
  } ,

  async getUserById(userId) {
    try {
      const response = await axios.get(`${API_URL}/userByid/${userId}`);
      return response;
    } catch (error) {
      throw new Error(`Error fetching user: ${error.message}`);
    }
  },

  async updateUser(userId, userData) {
    try {
      const response = await axios.put(`${API_URL}/update/${userId}`, userData);
      return response;
    } catch (error) {
      throw new Error(`Error updating user: ${error.message}`);
    }
  },

  async deleteUser(userId) {
    try {
      const response = await axios.delete(`${API_URL}/delete/${userId}`);
      return response;
    } catch (error) {
      throw new Error(`Error deleting user: ${error.message}`);
    }
  },
};

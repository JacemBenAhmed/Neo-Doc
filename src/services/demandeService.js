import axios from 'axios';

const API_BASE_URL = 'https://localhost:7014/api/Demande'; 

export default {
  async getAllDemandes() {
    try {
      const response = await axios.get(`${API_BASE_URL}/allDemandes`);
      console.log(response.data) ;
      return response.data;
     
    } catch (error) {
      console.error('Error fetching demandes:', error);
      throw error;
    }
  },
};
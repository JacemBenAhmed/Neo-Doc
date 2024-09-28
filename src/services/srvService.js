import axios from 'axios';

const API_BASE_URL = 'https://neodocs.azurewebsites.net/api/Services'; 

export default {


    async getServiceById(id) {
        try {
          const response = await axios.get(`${API_BASE_URL}/${id}`);
          return response.data;
        } catch (error) {
          console.error('Error fetching service by ID:', error);
          throw error;
        }
      }


} ;
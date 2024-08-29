import axios from 'axios';

const API_BASE_URL = 'https://localhost:7014/api/Document'; 

export default {
 
 
  async getDocumentByID(id) {
    try {
      const response = await axios.get(`${API_BASE_URL}/idDemande`,{
        params:{id:id}
      }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching demande by ID:', error);
      throw error;
    }
  }




};
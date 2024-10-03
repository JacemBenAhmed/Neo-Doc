import axios from 'axios';

const API_BASE_URL = 'https://neodocs.azurewebsites.net/api/Document'; 




const API = 'https://neodocs.azurewebsites.net/Document/';
export default {
 
  async createDocument(demandeId, documentTypes, file) {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('demandeId', demandeId);
      formData.append('documentTypes', documentTypes);

      for (let pair of formData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }

      const response = await axios.post(API_BASE_URL, formData);
      console.log('Document uploaded successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error uploading document:', error.response?.data || error.message);
      throw error;
    }
  },

  async getDocumentByID(id) {
    try {
      const response = await axios.get(`${API_BASE_URL}/idDemande`, {
        params: { id }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching demande by ID:', error);
      throw error;
    }
  }
  ,
  async deleteAllDocuments() {
    try {
      const response = await axios.delete(`${API_BASE_URL}/deleteByDemande`);
      return response.data; 
    } catch (error) {
      console.error('Error deleting all documents:', error.response?.data || error.message);
      throw error;
    }
  }
  
  
  
  ,

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
  ,
  
  async updateDocumentDemandeId(newDemandeId) {
    try {
      const response = await axios.put(`${API_BASE_URL}/${newDemandeId}`);
      console.log('Documents updated successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error updating documents:', error.response?.data || error.message);
      throw error;
    }
  }
  




};
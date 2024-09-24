import axios from 'axios';

const API_BASE_URL = 'https://localhost:7014/api/Document'; 

export default {
 
  async createDocument(demandeId, documentTypes, file) {
    try {
      const formData = new FormData();
      formData.append('demandeId', demandeId);
      formData.append('documentTypes', documentTypes);
      formData.append('file', file); 

      const response = await axios.post(`${API_BASE_URL}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Document uploaded successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error uploading document:', error);
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




};
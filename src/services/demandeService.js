import axios from 'axios';

const API_BASE_URL = 'https://neodocs.azurewebsites.net/api/Demande'; 

export default {

  async createDemande(demande) {
    try {
      const response = await axios.post(`${API_BASE_URL}`, demande);
      console.log('Demande created successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error creating demande:', error);
      throw error;
    }
  },


  
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
  async getNbDemandes()
  {
    try{
    const response = await axios.get(`${API_BASE_URL}/nbDemandes`);
    console.log(response.data) ;
    return response.data ;
      }
      catch(error)
      {
        console.log(error) ;
      }
  } ,
  async getStatusDemandes(status) {
    try {
      const response = await axios.get(`${API_BASE_URL}/nbStatusDemandes`, {
        params: { status: status }
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching status demandes:', error);
      throw error;
    }
  } ,
  async getDemandeById(id) {
    try {
      const response = await axios.get(`${API_BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching demande by ID:', error);
      throw error;
    }
  },
  async getDemandesByUserid(id)
  {
    try{
      const response = await axios.get(`${API_BASE_URL}/demandeUserId/${id}`);
      return response.data ;

    }
    catch(error){
      console.log(error) ;
    }
  } ,
  async getStatusDmdUserId(status, id) {
    try {
      const response = await axios.get(`${API_BASE_URL}/nbStatusDmdUserId/${id}`, {
        params: { status: status }
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching status demandes:', error);
      throw error;
    }
  } ,
  async updateStatus(id, newStatus) {
    return await axios.put(`${API_BASE_URL}/updateStatus/${id}?status=${newStatus}`);
  },
  
  





};
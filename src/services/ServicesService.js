import axios from "axios";

const BASE_URL = "https://neodocs.azurewebsites.net/api/Services";

async function getAllServices() {
  try {
    const services = await axios.get(BASE_URL);
    return services.data;
  } catch (e) {
    console.log(e);
    return [];
  }
}
async function createService(serviceData) {
  try {
    const response = await axios.post(BASE_URL, serviceData);
    return response.data;
    
  } catch (e) {
    console.error("Error creating service:", e);
    return null;
  }
}

async function deleteService(id) {
  try {
    await axios.delete(BASE_URL +"/"+ id);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}
async function updateService(id, updatedItem) {
  try {
    console.log("Updating service with ID:", id);
    console.log("Data being sent:", updatedItem);
    const response = await axios.put(BASE_URL +"/"+ id, updatedItem);
    return response;
  } catch (e) {
    console.log("Error in updateService:", e);
    return false;
  }
}

export { getAllServices, deleteService, updateService, createService };
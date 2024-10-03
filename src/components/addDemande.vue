<template>
  <div class="container mt-4 p-4 shadow-sm bg-white rounded">
    <h3 class="text-center mb-4">Tous les Fichiers </h3>

    <div class="table-responsive">
      <table class="table table-hover table-striped table-bordered text-center align-middle">
        <thead class="bg-primary text-white">
          <tr>
            <th>Nom du Fichier</th>
            <th>Format</th>
            <th>User Id</th>
            <th>Service</th>
          </tr>
        </thead>
        <tbody>

          <tr v-for="(file, index) in files" :key="index">
            <td>{{ file.nomFichier }}</td>
            <td>{{ file.documentType }}</td>
            <td>{{ userIdd }}</td>
            
            <td>
              <select v-model="serviceId" class="form-select">
                <option v-for="service in services.$values" :key="service.id" :value="service.id" >
                  {{ service.name }}
                </option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="text-center mt-4">
      <button class="btn btn-success px-5" @click="submitDemande">Ajout Demande</button>
    </div>
    
   
  </div>
</template>


<script>
import documentService from '@/services/documentService.js';
import demandeService from '@/services/demandeService.js';
import { getAllServices, createService, deleteService, updateService } from '@/services/ServicesService.js'; 


export default {
  data() {
    return {
      userIdd: localStorage.getItem('userId'),
      submissionId: '7795',
      files: [] ,
      services:[] , 
      serviceId:""
    };
  },
  mounted() {
    this.fetchDocuments();
    this.fetchServices() ;
    
  },
  methods: {
    async fetchDocuments() {

  try {
    const response = await documentService.getDocumentByID(2060); //fix and userId
    console.log('API Response:', response);

    this.files = Array.isArray(response.$values) ? response.$values.map(file => ({
      ...file,
      description: '',
      service: ''
    })) : []; 
  } catch (error) {
    console.error('Error fetching documents:', error.message);
  }

  console.log("files: ", this.files); 
}

,

    getDocumentType(mimeType) {
      if (mimeType.includes('pdf')) return 1;
      else if (mimeType.includes('jpeg') || mimeType.includes('png')) return 0;
      else if (mimeType.includes('txt')) return 2;
      else return 3;
    },

    async submitDemande() {


      const userIdd = localStorage.getItem('userId');
      //console.log("aa :"+userIdd) ;
      const demandeData = {
        id: 0,
        userId: userIdd, // a reparer avec token ou bien api getUserById
        dateSoummision: new Date(),
        statut: 0,
        serviceId: this.serviceId,
        service: {
          id: this.serviceId,
          name: "string",
          description: "string"
        }
  };

  try {
  const response = await demandeService.createDemande(demandeData);
  const newDemandeId = response.id;

  console.log('Demande created successfully:', response);
  console.log(newDemandeId);

  await documentService.updateDocumentDemandeId(newDemandeId);
  alert("update succ :!") ;

} catch (error) {
  console.error('Error creating demande:', error.response?.data || error.message);
}


},

async fetchServices() {
      this.services = await getAllServices();
      console.log(this.services) ;
    },
    
    







   
  }
};


</script>

<style scoped>
.container {
  max-width: 1100px;
  margin: 0 auto;
  background-color: #f8f9fa;
  border-radius: 12px;
  padding: 30px;
}

.table-hover tbody tr:hover {
  background-color: #f1f1f1;
}
</style>

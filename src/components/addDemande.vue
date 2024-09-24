<template>
    <div class="container mt-4 p-4 shadow-sm bg-white rounded">
      <h3 class="text-center mb-4">All Files</h3>
  
      <div class="table-responsive">
        <table class="table table-hover table-striped table-bordered text-center align-middle">
          <thead class="bg-primary text-white">
            <tr>
              <th>File Name</th>
              <th>Format</th>
              <th>User Id</th>
              <th>Submission Id</th>
              <th>Description</th>
              <th>Service</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(file, index) in files" :key="index">
              <td>{{ file.nomFichier }}</td>
              <td>{{ file.documentType }}</td>
              <td>{{ userId }}</td>
              <td>{{ submissionId }}</td>
              <td>
                <input
                  type="text"
                  v-model="file.description"
                  class="form-control"
                  placeholder="Add a description"
                />
              </td>
              <td>
                <select v-model="file.service" class="form-select">
                  <option value="service1">Service 1</option>
                  <option value="service2">Service 2</option>
                  <option value="service3">Service 3</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <div class="text-center mt-4">
        <button class="btn btn-success px-5" @click="submitDemande">Submit Demande</button>
      </div>
    </div>
  </template>
  
  <script>
  import demandeService from '@/services/demandeService.js';
  import documentService from '@/services/demandeService.js';


  export default {
    
    data() {
      return {
        userId: '0001', 
        submissionId: '7795', 
        files: []
      };
    },
    mounted() {
      const storedFiles = localStorage.getItem('uploadedFiles');
      if (storedFiles) {
        this.files = JSON.parse(storedFiles).map((file) => ({
          ...file,
          description: '',
          service: ''
        }));
      }
    },
    methods: {


 async submitDemande() {
    const newDemande = {
      id: 0, 
      userId: this.userId,
      dateSoummision: new Date().toISOString(), 
      statut: 0,
      serviceId: 3, 
      service: {
        id:3, 
        name: "tet",
        description: "desc"
      }
    };

    console.log('Submitting demande:', newDemande);

    try {
      const demandeResponse = await demandeService.createDemande(newDemande);
      const demandeId = demandeResponse.id; 

      console.log('Demande created successfully:', demandeResponse.data);

      for (const file of this.files) {
        const documentTypes = this.documentType; 

        try {
          const documentResponse = await documentService.createDocument(demandeId, documentTypes, file);
          console.log('Document created successfully:', documentResponse);
        } catch (error) {
          console.error('Error creating document:', error);
        }
      }


    } catch (error) {
      console.error('Error creating demande:', error);
    }
  }
    }
  } 
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
  
  h3 {
    font-weight: bold;
  }
  
  input[type="text"] {
    border-radius: 5px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  select.form-select {
    border-radius: 5px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  button.btn-success {
    background-color: #28a745;
    border-color: #28a745;
    transition: background-color 0.3s ease;
  }
  
  button.btn-success:hover {
    background-color: #218838;
  }
  </style>
  
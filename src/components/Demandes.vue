<template>


<div class="container mt-4">


    <h4 class="fw-bold mb-4">Suivi des demandes</h4>



    <div class="row bg-white p-4 rounded shadow-sm">
      <div class="col-md-4 d-flex align-items-center justify-content-center">
        <div class="text-center">
          <div class="bg-success rounded-circle p-4 mb-2 mx-auto" style="width: 80px; height: 80px;">
            <i class="bi bi-file-earmark-text-fill text-white" style="font-size: 2rem;"></i>
          </div>
          <h5 class="fw-bold">Total Requests</h5>
          <h2 class="fw-bold">23</h2>
         
        </div>
      </div>

      <div class="col-md-4 d-flex align-items-center justify-content-center">
        <div class="text-center">
          <div class="bg-success rounded-circle p-4 mb-2 mx-auto" style="width: 80px; height: 80px;">
            <i class="bi bi-check-circle-fill text-white" style="font-size: 2rem;"></i>
          </div>
          <h5 class="fw-bold">Requests Accepted</h5>
          <h2 class="fw-bold">16</h2>
          
        </div>
      </div>

     
      <div class="col-md-4 d-flex align-items-center justify-content-center">
        <div class="text-center">
          <div class="bg-success rounded-circle p-4 mb-2 mx-auto" style="width: 80px; height: 80px;">
            <i class="bi bi-x-circle-fill text-white" style="font-size: 2rem;"></i>
          </div>
          <h5 class="fw-bold">Requests Rejected</h5>
          <h2 class="fw-bold">3</h2>
          
        </div>
      </div>
    </div>
  </div>

  <br><br><br><br><br>

  <div class="container mt-5">
   
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h4 class="fw-bold">ALL REQUESTS</h4>
      <div class="input-group w-25">

        <input type="search" class="form-control" placeholder="Search" />

        <button class="btn btn-outline-secondary dropdown-toggle" type="button">
          Sort by: Newest
        </button>
      </div>
    </div>

   
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">Request ID</th>
          <th scope="col">Date</th>
          <th scope="col">Service</th>
          <th scope="col">Status</th>
          <th scope="col">Details</th>
        </tr>
      </thead>

      <tbody>
        
          <tr v-for="demande in demandes.$values" :key="demande.id">
            <td>{{ demande.id }}</td>
            <td>{{ new Date(demande.dateSoummision).toLocaleDateString() }}</td>
            <td>Service X</td>
            <td>
              <span :class="statusClass(demande.statut)" class="fw-bold">
                {{ statusEx[demande.statut] }}
              </span>
            </td>
            <td><button class="btn btn-primary btn-sm">See More</button></td>
          </tr>
        
      </tbody>
    </table>
  </div>
</template>



<script>
import demandeService from '@/services/demandeService.js';

export default {
  name: 'DemandeTable',
  data() {
    return {
      demandes: [],
      status:"yy",
      statusEx:["Traitée" , "En Cours" , "Refusée" ,"En attente" ] ,
      classStatus:'text-success fw-bold'
    };
  },
  methods: {
    async fetchDemandes() {
      try {
        this.demandes = await demandeService.getAllDemandes();
      } catch (error) {
        console.error('Error loading demandes:', error);
      }
    },
        statusClass(statut) {
      switch (statut) {
        case 0:
          return 'text-success'; 
        case 1:
          return 'text-warning'; 
        case 2:
          return 'text-danger'; 
        case 3:
          return 'text-muted'; 
        default:
          return '';
      }
    }
  
   
  },
  created() {
    this.fetchDemandes();
  },
};
</script>

<style scoped>
.table th {
  color: #777575;
}

.table td {
  font-size: 0.9rem; 
  vertical-align: middle; 
}

.input-group .form-control {
  border-radius: 0.375rem 0 0 0.375rem;
}

.input-group .btn {
  border-radius: 0 0.375rem 0.375rem 0;
}
</style>

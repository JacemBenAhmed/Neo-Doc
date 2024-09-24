<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">

  <div class="container mt-4">
    <h4 class="fw-bold mb-4">Suivi des demandes</h4>

    <div class="row bg-white p-4 rounded shadow-sm">
      <div class="col-md-4 d-flex align-items-center justify-content-center">
        <div class="text-center">
          <div class="bg-light rounded-circle p-4 mb-2 mx-auto" style="width: 80px; height: 80px;">
            <i class="fas fa-file-alt text-primary" style="font-size: 2rem;"></i>
          </div>
          <h5 class="fw-bold">Total Requests</h5>
          <h2 class="fw-bold">{{ nbDemandes }}</h2>
        </div>
      </div>

      <div class="col-md-4 d-flex align-items-center justify-content-center">
        <div class="text-center">
          <div class="bg-light rounded-circle p-4 mb-2 mx-auto" style="width: 80px; height: 80px;">
            <i class="fas fa-check-circle text-success" style="font-size: 2rem;"></i>
          </div>
          <h5 class="fw-bold">Requests Accepted</h5>
          <h2 class="fw-bold">{{ nbAccDemandes }}</h2>
        </div>
      </div>

      <div class="col-md-4 d-flex align-items-center justify-content-center">
        <div class="text-center">
          <div class="bg-light rounded-circle p-4 mb-2 mx-auto" style="width: 80px; height: 80px;">
            <i class="fas fa-times-circle text-danger" style="font-size: 2rem;"></i>
          </div>
          <h5 class="fw-bold">Requests Rejected</h5>
          <h2 class="fw-bold">{{ nbRefDemandes }}</h2>
        </div>
      </div>
    </div>

    <div class="container mt-5">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h4 class="fw-bold">ALL REQUESTS</h4>
        <div class="input-group w-25">
          <input type="search" class="form-control" placeholder="Search" v-model="searchDemande" />
          <button class="btn btn-outline-secondary dropdown-toggle" type="button" @click="toggleSortOrder">
            Sort by: {{ sortOrder }}
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
          <tr v-for="demande in sortedDemandes" :key="demande.id">
            <td>{{ demande.id }}</td>
            <td>{{ new Date(demande.dateSoummision).toLocaleDateString() }}</td>
            <td> {{demande.serviceName }} </td>
            <td>
              <span :class="statusClass(demande.statut)" class="fw-bold">
                {{ statusEx[demande.statut] }}
              </span>
            </td>
            <td>
              <router-link :to="{ name: 'DemandeDetails', params: { id: demande.id } }" class="btn btn-primary btn-sm">See More</router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

</template>

<script>
import demandeService from '@/services/demandeService.js';
import srvService from '@/services/srvService.js' ;
export default {
  name: 'DemandeTable',
  data() {
    return {
      demandes: [],
      statusEx: ["En Attente", "En Cours", "Traité", "Refusé"],
      nbDemandes: 0,
      nbAccDemandes: 0,
      nbRefDemandes: 0,
      searchDemande: '',
      sortOrder: 'Oldest' 
    };
  },
  methods: {
    async fetchDemandes() {
    try {
      const response = await demandeService.getAllDemandes();
      const demandes = response.$values || [];
      
      for (const demande of demandes) {
        try {
          const service = await srvService.getServiceById(demande.serviceId);
          demande.serviceName = service.name;  
        } catch (error) {
          console.error(`Error fetching service name for demande ${demande.id}:`, error);
          demande.serviceName = 'Unknown';  
        }
      }
      
      this.demandes = demandes; 

    } catch (error) {
      console.error('Error loading demandes:', error);
    }
  },
    statusClass(statut) {
      switch (statut) {
        case 0:
          return 'text-muted'; 
        case 1:
          return 'text-warning'; 
        case 2:
          return 'text-success'; 
        case 3:
          return 'text-danger'; 
        default:
          return '';
      }
    },
    async fetchNbDemandes() {
      try {
        this.nbDemandes = await demandeService.getNbDemandes();
      } catch (error) {
        console.error('Error loading total demandes:', error);
      }
    },
    async fetchNbAccDemandes() {
      try {
        this.nbAccDemandes = await demandeService.getStatusDemandes(2); 
      } catch (error) {
        console.error('Error loading accepted demandes:', error);
      }
    },
    async fetchNbRefDemandes() {
      try {
        this.nbRefDemandes = await demandeService.getStatusDemandes(3); 
      } catch (error) {
        console.error('Error loading rejected demandes:', error);
      }
    },
    toggleSortOrder() {
      this.sortOrder = this.sortOrder === 'Newest' ? 'Oldest' : 'Newest';
    } ,
     async getServiceName(id)
    {
      try{
        var srv = await srvService.getServiceById(id) ;
       console.log(srv.name) ;
        return srv.name ;
      }
      catch(error)
      {
        console.log(error) ;
      }
    }

   

  },
  computed: {
    filteredDemandes() {
      if (!this.searchDemande) {
        return this.demandes;
      }
      this.searchDemande=this.searchDemande.toLowerCase() ;
      const statusMap = {
        "traité": 2,
        "refusé": 3,
        "en attente": 0,
        "en cours": 1
      };

      const status = statusMap[this.searchDemande] !== undefined
        ? statusMap[this.searchDemande]
        : null;

      return this.demandes.filter(demande => 
        status === null || demande.statut === status
      );
    },
    
    sortedDemandes() {

      return this.filteredDemandes.slice().sort((a, b) => {
        if (this.sortOrder === 'Newest') {
          return new Date(b.dateSoummision) - new Date(a.dateSoummision);
        } else {
          return new Date(a.dateSoummision) - new Date(b.dateSoummision);
        }
      });
    } ,
    
  },
  async created() {
    await this.fetchDemandes();
    await this.fetchNbDemandes();
    await this.fetchNbAccDemandes();
    await this.fetchNbRefDemandes();
  }
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

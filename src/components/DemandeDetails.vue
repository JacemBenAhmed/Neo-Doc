  <template>
    <div class="container mt-4">
      <h4 class="fw-bold mb-4">Request Details</h4>

      <div v-if="demande" class="card">
        <div class="card-body">
          <h5 class="card-title">Request ID : {{ demande.id }}</h5>
          <p class="card-text"><strong>Date :</strong> {{ new Date(demande.dateSoummision).toLocaleDateString() }}</p>
          <p class="card-text"><strong>Status :</strong> <span :class="statusClass(demande.statut)">{{ statusEx[demande.statut] }}</span></p>
          <p class="card-text"><strong>Details :</strong> {{ demande.details }}</p>
          <p class="card-text"><strong>Documents :</strong> </p>
          <div v-for="document in documents" :key="document.id">
            <p> {{document.nomFichier}} </p>
          </div>
          <a href="#" class="btn btn-primary" @click="$router.go(-1)">Back</a>
        </div>
      </div>

      <div v-else class="text-center mt-5">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>

      
    
    </div>
  </template>

  <script>
  import demandeService from '@/services/demandeService.js';
  import documentService from "@/services/documentService.js";

  export default {
    name: 'DemandeDetails',
    props: ['id'],
    data() {
      return { 
        demande: null,
        statusEx: ["En Attente", "En Cours", "Traité", "Refusé"],
        documents: []
      };
    },
    methods: {
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

      async getDocumentsById() {
        try {
          const response = await documentService.getDocumentByID(this.id);
          this.documents = response.$values || []; 
        } catch (error) {
          console.error("Error fetching documents:", error);
        }
      }



    },
    async created() {
      try {
        const response = await demandeService.getDemandeById(this.id);
        this.demande = response;

        await this.getDocumentsById();
      } catch (error) {
        console.error('Error loading demande details:', error);
      }
    }
  };
  </script>

  <style scoped>
  .card {
    margin-top: 20px;
  }
  </style>

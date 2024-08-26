<template>
  <div class="container mt-4">
    <h4 class="fw-bold mb-4">Request Details</h4>
    <div v-if="demande" class="card">
      <div class="card-body">
        <h5 class="card-title">Request ID: {{ demande.id }}</h5>
        <p class="card-text"><strong>Date:</strong> {{ new Date(demande.dateSoummision).toLocaleDateString() }}</p>
        <p class="card-text"><strong>Status:</strong> <span :class="statusClass(demande.statut)">{{ statusEx[demande.statut] }}</span></p>
        <p class="card-text"><strong>Details:</strong> {{ demande.details }}</p>
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

export default {
  name: 'DemandeDetails',
  props: ['id'],
  data() {
    return {
      demande: null,
      statusEx: ["En Attente", "En Cours", "Traité", "Refusé"] ,
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
    }
  },
  async created() {
    try {
      const response = await demandeService.getDemandeById(this.id);
      this.demande = response;
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

<template>
  <div class="container mt-4">
    <h4 class="fw-bold mb-4">Demande details</h4>

    <div v-if="demande" class="card shadow-sm">
      <div class="card-body">
        <h5 class="card-title">Demande ID: {{ demande.id }}</h5>

        <table class="table table-bordered">
          <tbody>
            <tr>
              <th scope="row">Date</th>
              <td>{{ new Date(demande.dateSoummision).toLocaleDateString() }}</td>
            </tr>
            <tr>
              <th scope="row">Status</th>
              <td>
                <span :class="statusClass(demande.statut)">{{ statusEx[demande.statut] }}</span>
                <select class="form-select mt-2" v-model="newStatus">
                  <option v-for="(status, index) in statusEx" :key="index" :value="index">
                    {{ status }}
                  </option>
                </select>
                <button class="btn btn-success mt-2" @click="updateStatus">Confirmer</button>
              </td>
            </tr>
            <tr>
              <th scope="row">Details</th>
              <td>{{ demande.details }}</td>
            </tr>
          </tbody>
        </table>

        <h5 class="mt-4">Documents:</h5>
        <ul class="list-group">
          <li v-for="document in documents" :key="document.id" class="list-group-item">
            {{ document.nomFichier }}
          </li>
        </ul>

        <button class="btn btn-primary mt-4" @click="$router.go(-1)">Retour</button>
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
import demandeService from "@/services/demandeService.js";
import documentService from "@/services/documentService.js";
import userService from "@/services/userService.js"; // Added this line

export default {
  name: "DemandeDetails",
  props: ["id"],
  data() {
    return {
      demande: null,
      statusEx: ["En Attente", "En Cours", "Traité", "Refusé"],
      documents: [],
      newStatus: null, // Added for changing status
      
    };
  },
  methods: {
    statusClass(statut) {
      switch (statut) {
        case 0:
          return "text-muted";
        case 1:
          return "text-warning";
        case 2:
          return "text-success";
        case 3:
          return "text-danger";
        default:
          return "";
      }
    },
    async getDocumentsById() {
      try {
        const response = await documentService.getDocumentByID(this.id);
        this.documents = response.$values || [];
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    },
    async getUserEmail() {
      if (this.demande && this.demande.userId) {
        try {
          const user = await userService.getUserById(this.demande.userId);
          this.userEmail = user.email; 
        } catch (error) {
          console.error("Error fetching user email:", error);
        }
      }
    },
   
    async updateStatus() {
      try {
        await demandeService.updateStatus(this.id, this.newStatus);
        this.demande.statut = this.newStatus; 

        alert("Status updated successfully!");
      } catch (error) {
        console.error("Error updating status:", error);
      }
    },
  },
  async created() {
    try {
      const response = await demandeService.getDemandeById(this.id);
      this.demande = response;
      this.newStatus = this.demande.statut; 
      await this.getDocumentsById();
      await this.getUserEmail(); 
    } catch (error) {
      console.error("Error loading demande details:", error);
    }
  },
};
</script>

<style scoped>
.card {
  margin-top: 20px;
}
.table th {
  width: 30%;
}
.table td,
.table th {
  vertical-align: middle;
}
</style>

<template>
  <div class="container mt-5">
    <h2>Services</h2>
    <button class="btn btn-primary mb-3" @click="showCreateModal = true">Create Service</button>
    <br><br><br><br><br><br><br><br>
    <table class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nom du Service</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="service in services.$values" :key="service.id">
          <td>{{ service.id }}</td>
          <td>{{ service.name }}</td>
          <td>{{ service.description }}</td>
          <td>
            <button class="btn btn-warning" @click="editService(service)">Edit</button>
            <button class="btn btn-danger" @click="deleteService(service.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="modal" tabindex="-1" v-if="showCreateModal || showEditModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ isEditing ? 'Edit Service' : 'Create Service' }}</h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label for="serviceName" class="form-label">Service Name</label>
              <input type="text" class="form-control" id="serviceName" v-model="serviceForm.name" required>
            </div>
            <div class="mb-3">
              <label for="serviceDesc" class="form-label">Service Description</label>
              <input type="text" class="form-control" id="serviceDesc" v-model="serviceForm.description"> 
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
            <button type="button" class="btn btn-primary" @click="isEditing ? updateService() : createService()">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAllServices, createService, deleteService, updateService } from '@/services/ServicesService.js'; 

export default {
  data() {
    return {
      services: [],
      showCreateModal: false,
      showEditModal: false,
      serviceForm: {
        name: '',
        description: '' 
      },
      isEditing: false,
    };
  },
  methods: {
    async fetchServices() {
      this.services = await getAllServices();
    },

    async createService() {
      const newService = await createService(this.serviceForm);
      if (newService) {
        alert("Service added successfully!");
        this.closeModal();
        await this.fetchServices(); 
      }
    },

    async deleteService(id) {
      const success = await deleteService(id);
      if (success) {
        alert("Service deleted successfully!");
        await this.fetchServices(); 
      }
    },

    editService(service) {
      this.serviceForm = { ...service };
      this.isEditing = true;
      this.showEditModal = true;
    },

    async updateService() {
      const updatedService = await updateService(this.serviceForm.id, this.serviceForm);
      if (updatedService) {
        alert("Service updated successfully!");
        this.closeModal();
        await this.fetchServices(); 
      }
    },

    closeModal() {
      this.showCreateModal = false;
      this.showEditModal = false;
      this.serviceForm = { id: null, name: '', description: '' }; 
      this.isEditing = false;
    }
  },
  mounted() {
    this.fetchServices();
  }
};
</script>

<style scoped>
.modal {
  display: block; 
}
</style>

<template>
  <div class="container mt-4">
    <h4 class="fw-bold mb-4">Edit Profile</h4>

    <form @submit.prevent="updateUserProfile">
      <div class="mb-3">
        <label for="firstName" class="form-label">Prenom</label>
        <input
          type="text"
          v-model="user.firstName"
          class="form-control"
          id="firstName"
          required
        />
      </div>

      <div class="mb-3">
        <label for="lastName" class="form-label">Nom</label>
        <input
          type="text"
          v-model="user.lastName"
          class="form-control"
          id="lastName"
          required
        />
      </div>

      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input
          type="email"
          v-model="user.email"
          class="form-control"
          id="email"
          required
        />
      </div>

      <div class="mb-3">
        <label for="city" class="form-label">Cité</label>
        <input
          type="text"
          v-model="user.city"
          class="form-control"
          id="city"
        />
      </div>

      <div class="mb-3">
        <label for="phoneNumber" class="form-label">num tel</label>
        <input
          type="tel"
          v-model="user.phoneNumber"
          class="form-control"
          id="phoneNumber"
        />
      </div>

      <button type="submit" class="btn btn-success">Enregistrer les Changements</button>
      
    </form>
  </div>
</template>

<script>
import userService from "@/services/userService.js";

export default {
  name: "EditProfile",
  data() {
    return {
      user: {
        firstName: "",
        lastName: "",
        email: "",
        city: "",
        phoneNumber: "",
        role: localStorage.getItem("userRole"),
      },
      userId: localStorage.getItem("userId"),
    };
  },
  async mounted() {
    await this.fetchUserData();
  },
  methods: {
    async fetchUserData() {
      try {
        const response = await userService.getUserById(this.userId); 
        this.user = response.data; 
      } catch (error) {
        alert(`Error fetching user data: ${error}`);
      }
    },

    async updateUserProfile() {
      try {
        await userService.updateUser(this.userId, this.user);
        alert("User updated successfully!");
      } catch (error) {
        alert(`Error updating user: ${error}`);
      }
    },

    
  },
};
</script>

<style scoped>
.container {
  max-width: 600px;
}
</style>

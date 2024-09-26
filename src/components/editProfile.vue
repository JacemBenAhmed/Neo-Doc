<template>
    <div class="container mt-4">
      <h4 class="fw-bold mb-4">Edit Profile</h4>
  
      <form @submit.prevent="updateUserProfile">
        <div class="mb-3">
          <label for="firstName" class="form-label">First Name</label>
          <input type="text" v-model="user.firstName" class="form-control" id="firstName" required />
        </div>
  
        <div class="mb-3">
          <label for="lastName" class="form-label">Last Name</label>
          <input type="text" v-model="user.lastName" class="form-control" id="lastName" required />
        </div>
  
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input type="email" v-model="user.email" class="form-control" id="email" required />
        </div>
  
        <div class="mb-3">
          <label for="city" class="form-label">City</label>
          <input type="text" v-model="user.city" class="form-control" id="city" />
        </div>
  
        <div class="mb-3">
          <label for="phoneNumber" class="form-label">Phone Number</label>
          <input type="tel" v-model="user.phoneNumber" class="form-control" id="phoneNumber" />
        </div>
  
        <button type="submit" class="btn btn-success">Save Changes</button>
        <button type="button" class="btn btn-danger ms-2" @click="deleteUserProfile">Delete Account</button>
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
          role: localStorage.getItem('userRole'),
        },
        userId: localStorage.getItem('userId'), 
      };
    },
    methods: {
      async updateUserProfile() {
        try {
          await userService.updateUser(this.userId, this.user);
          alert("User updated successfully!");
        } catch (error) {
          alert(`Error updating user: ${error}`);
        }
      },
  
      async deleteUserProfile() {
        if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
          try {
            await userService.deleteUser(this.userId);
            alert("User deleted successfully.");
            this.$router.push("/login"); // Redirect after deletion
          } catch (error) {
            alert(`Error deleting user: ${error}`);
          }
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
  
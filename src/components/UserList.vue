<template>
  <v-container>
    <h2>User List</h2>
    <v-data-table
      :headers="headers"
      :items="users"
      item-key="id"
      class="elevation-1"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn icon @click="editUser(item)">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon @click="deleteUser(item.id)">
          <v-icon color="red">mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>

    <!-- Modal for Editing User -->
    <v-dialog v-model="showModal" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Edit User</span>
        </v-card-title>
        <v-card-text>
          <v-form @submit.prevent="updateUser">
            <v-text-field
              v-model="selectedUser.firstName"
              label="First Name"
              required
            ></v-text-field>
            <v-text-field
              v-model="selectedUser.lastName"
              label="Last Name"
              required
            ></v-text-field>
            <v-text-field
              v-model="selectedUser.email"
              label="Email"
              required
            ></v-text-field>
            <v-text-field
              v-model="selectedUser.city"
              label="City"
            ></v-text-field>
            <v-text-field
              v-model="selectedUser.phoneNumber"
              label="Phone Number"
            ></v-text-field>
            <v-select
              v-model="selectedUser.role"
              :items="['agent', 'admin']"
              label="Role"
            ></v-select>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeModal">
            Cancel
          </v-btn>
          <v-btn color="blue darken-1" text @click="updateUser">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      users: [],
      selectedUser: {
        firstName: '',
        lastName: '',
        email: '',
        city: '',
        phoneNumber: '',
        role: '',
      },
      showModal: false,
      headers: [
        { text: 'First Name', value: 'firstName' },
        { text: 'Last Name', value: 'lastName' },
        { text: 'Email', value: 'email' },
        { text: 'City', value: 'city' },
        { text: 'Phone Number', value: 'phoneNumber' },
        { text: 'Role', value: 'role' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      token: localStorage.getItem('token') || '',
    };
  },
  async created() {
    await this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get('https://localhost:7036/User/users', {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });
        this.users = response.data;
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    },
    editUser(user) {
      this.selectedUser = { ...user };
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.selectedUser = {
        firstName: '',
        lastName: '',
        email: '',
        city: '',
        phoneNumber: '',
        role: '',
      };
    },
    async updateUser() {
      try {
        await axios.put(`https://localhost:7036/User/update/${this.selectedUser.id}`, this.selectedUser, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });
        alert('User updated successfully');
        await this.fetchUsers();
        this.closeModal();
      } catch (error) {
        console.error('Failed to update user:', error.response || error.message);
        alert('Failed to update user');
      }
    },
    async deleteUser(id) {
      if (confirm('Are you sure you want to delete this user?')) {
        try {
          await axios.delete(`https://localhost:7014/User/delete/${id}`, {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          });
          alert('User deleted successfully');
          await this.fetchUsers();
        } catch (error) {
          console.error('Failed to delete user:', error.response || error.message);
          alert('Failed to delete user');
        }
      }
    },
  },
};
</script>

<style scoped>
.v-data-table {
  margin-bottom: 20px;
}

.v-btn {
  margin-right: 10px;
}
</style>
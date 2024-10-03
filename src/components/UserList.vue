<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
  
  <div class="container mt-4">
    <h4 class="fw-bold mb-4">User List</h4>

    <div class="container mt-5">

      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">User ID</th>
            <th scope="col">Prenom</th>
            <th scope="col">Nom</th>
            <th scope="col">Email</th>
            <th scope="col">Cité</th>
            <th scope="col">Role</th>
            
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users.$values" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.firstName }}</td>
            <td>{{ user.lastName }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.city }}</td>
            <td>{{ user.role }}</td>
            
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import userService from '@/services/userService.js';

export default {
  name: 'UserTable',
  data() {
    return {
      users: [],
      searchUser: '',
      sortOrder: 'Oldest',
    };
  },
  async mounted() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.$router.push('/login');
      return;
    }
    console.log("token : " + token) ;

    try {
      const response = await userService.getUsers(token);
      this.users = response.data;
      console.log(this.users);
    } catch (error) {
      alert('Error fetching users: ' + error.response.data);
    }
  },

  methods: {
    async deleteUser(id) {
      const token = localStorage.getItem('jwt');
      if (confirm('Are you sure you want to delete this user?')) {
        try {
          await userService.deleteUser(id, token);
          this.users = this.users.filter(user => user.id !== id);
        } catch (error) {
          alert('Error deleting user: ' + error.response.data);
        }
      }
    } ,
    showusers()
    {
      console.log(this.users) ;
    }
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

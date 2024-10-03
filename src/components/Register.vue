<!-- eslint-disable vue/multi-word-component-names -->
<template >
  <center>
  <div class="container" >
    <div class="title">Creer un compte</div>
    <div class="content">
      <form @submit.prevent="register">
        <div class="user-details">
          <div class="input-box">
            <span class="details">Prenom</span>
            <input v-model="firstName" type="text" placeholder="Enter your first name" required>
          </div>
          <div class="input-box">
            <span class="details">Nom</span>
            <input v-model="lastName" type="text" placeholder="Enter your last name" required>
          </div>
          <div class="input-box">
            <span class="details">Email</span>
            <input v-model="email" type="email" placeholder="Enter your email" required>
          </div>
          <div class="input-box">
            <span class="details">Cité</span>
            <input v-model="city" type="text" placeholder="Enter your city" required>
          </div>
          <div class="input-box">
            <span class="details">Num tel</span>
            <input v-model="phoneNumber" type="text" placeholder="Enter your phone number" required>
          </div>
          <div class="input-box">
            <span class="details">Password</span>
            <input v-model="password" type="password" placeholder="Enter your password" required>
          </div>
        </div>
        <div class="role-details">
          <span class="details">Role</span>
          <select v-model="role" required>
            <option value="agent">Agent</option>
            <option value="client">client</option>
          </select>
        </div>
        <div class="button">
          <input type="submit" value="Register">
        </div>
        
      </form>
    </div>
  </div>
</center>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      city: '',
      phoneNumber: '',
      password: '',
      role: 'agent',
    };
  },
  methods: {
    async register() {
      const payload = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        city: this.city,
        phoneNumber: this.phoneNumber,
        password: this.password,
        role: this.role,
      };
      try {
        const response = await axios.post('https://neodocs.azurewebsites.net/User/register', payload);
        console.log(response.data);
        alert('Registration successful');
        //this.$router.push('/login');
      } catch (error) {
        console.error('Registration failed:', error.response || error.message);
        alert('Registration failed: ' + (error.response?.data?.message || 'An error occurred'));
      }
    },
    goToLogin() {
      this.$router.push('/login');
    }
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

body {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background: linear-gradient(135deg, #71b7e6, #9b59b6);
}

.container {
  max-width: 700px;
  width: 100%;
  background-color: #fff;
  padding: 25px 30px;
  border-radius: 5px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
}

.container .title {
  font-size: 25px;
  font-weight: 500;
  position: relative;
}

.container .title::before {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  height: 3px;
  width: 30px;
  border-radius: 5px;
  background: linear-gradient(135deg, #71b7e6, #9b59b6);
}

.content form .user-details {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 20px 0 12px 0;
}

form .user-details .input-box {
  margin-bottom: 15px;
  width: calc(100% / 2 - 20px);
}

form .input-box span.details {
  display: block;
  font-weight: 500;
  margin-bottom: 5px;
}

.user-details .input-box input {
  height: 45px;
  width: 100%;
  outline: none;
  font-size: 16px;
  border-radius: 5px;
  padding-left: 15px;
  border: 1px solid #ccc;
  border-bottom-width: 2px;
  transition: all 0.3s ease;
}

.user-details .input-box input:focus,
.user-details .input-box input:valid {
  border-color: #9b59b6;
}

.role-details {
  margin: 20px 0;
}

.role-details select {
  width: 100%;
  height: 45px;
  border-radius: 5px;
  border: 1px solid #ccc;
  padding-left: 15px;
  font-size: 16px;
}

form .button {
  height: 45px;
  margin: 35px 0;
}

form .button input {
  height: 100%;
  width: 100%;
  border-radius: 5px;
  border: none;
  color: #fff;
  font-size: 18px;
  font-weight: 500;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: linear-gradient(135deg, #71b7e6, #9b59b6);
}

form .button input:hover {
  background: linear-gradient(-135deg, #71b7e6, #9b59b6);
}

@media(max-width: 584px) {
  .container {
    max-width: 100%;
  }

  form .user-details .input-box {
    margin-bottom: 15px;
    width: 100%;
  }
}

@media(max-width: 459px) {
  .container .content .category {
    flex-direction: column;
  }
}
</style>
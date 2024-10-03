<template>
  <div class="container">
    <div class="title">Se connecter</div>
    <div class="content">
      <form @submit.prevent="login">
        <div class="user-details">
          <div class="input-box">
            <span class="details">Email</span>
            <input v-model="email" type="text" placeholder="Enter your email" required />
          </div>
          <div class="input-box">
            <span class="details">Password</span>
            <input v-model="password" type="password" placeholder="Enter your password" required />
          </div>
        </div>
        <div class="button">
          <input type="submit" value="Login" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import VueJwtDecode from 'vue-jwt-decode'

export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async login() {
      const payload = {
        email: this.email,
        password: this.password,
      };
      try {
        const response = await axios.post('https://neodocs.azurewebsites.net/User/login', payload);

        const token = response.data.token;
        localStorage.setItem('token', token);

        const decoded = VueJwtDecode.decode(token);
        localStorage.setItem('userRole', decoded.role);
        localStorage.setItem('userId', decoded.nameid);

        this.$router.push('/');
      } catch (error) {
        if (error.response) {
          alert(`Login failed: ${error.response.data.message || 'Invalid credentials'}`);
        } else if (error.request) {
          alert('Network error: Unable to reach the server');
        } else {
          alert(`Error: ${error.message}`);
        }
      }
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Poppins:400,500,600,700&display=swap');

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
  text-align: center;
}

.container .title::before {
  content: "";
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  height: 3px;
  width: 50px;
  border-radius: 5px;
  background: linear-gradient(135deg, #71b7e6, #9b59b6);
}

.content form .user-details {
  display: flex;
  flex-direction: column;
  margin: 20px 0;
}

form .user-details .input-box {
  margin-bottom: 15px;
  width: 100%;
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
</style>

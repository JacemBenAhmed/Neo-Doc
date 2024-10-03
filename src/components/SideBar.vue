<template>
  <div>
    <button
      class="btn btn-primary d-md-none position-fixed"
      @click="toggleSidebar"
      style="top: 1rem; left: 1rem; z-index: 1050;"
      aria-label="Toggle sidebar"
    >
      <i class="lni lni-menu"></i>
    </button>

    <nav class="sidebar" :class="{ active: isVisible }" ref="sidebar">
      <div class="sidebar-header d-flex align-items-center justify-content-between p-3">
        <router-link to="/" class="sidebar-logo text-white h5 mb-0">NeoDocs</router-link>
      </div>
      <ul class="nav flex-column">
        <li class="nav-item">
          <router-link to="/editProfile" class="nav-link text-white" active-class="active" v-if="isLoggedIn">
            <i class="lni lni-user"></i>
            <span v-if="!isCollapsed">Profile</span>
          </router-link>
        </li>
        <li class="nav-item" v-if="!isLoggedIn">
          <router-link to="/registerUser" class="nav-link text-white" active-class="active">
            <i class="lni lni-user"></i>
            <span v-if="!isCollapsed">Creer un compte</span>
          </router-link>
        </li>
        <li class="nav-item" v-if="isAdminOrAgent">
          <router-link to="/demandes" class="nav-link text-white" active-class="active">
            <i class="lni lni-agenda"></i>
            <span v-if="!isCollapsed">Suivi Demandes</span>
          </router-link>
        </li>
        <li class="nav-item" v-if="isAdminOrAgent">
          <router-link to="/addDocs" class="nav-link text-white" active-class="active">
            <i class="lni lni-popup"></i>
            <span v-if="!isCollapsed">Ajout Demande</span>
          </router-link>
        </li>
        <li class="nav-item" v-if="isAdmin">
          <router-link to="/users" class="nav-link text-white" active-class="active">
            <i class="lni lni-popup"></i>
            <span v-if="!isCollapsed">modifier Utilisateurs</span>
          </router-link>
        </li>
        <li class="nav-item" v-if="isAdmin">
          <router-link to="/services" class="nav-link text-white" active-class="active">
            <i class="lni lni-cog"></i>
            <span v-if="!isCollapsed">Services</span>
          </router-link>
        </li>
        <li class="nav-item" v-if="isAdmin && isLoggedIn">
          <router-link to="/register" class="nav-link text-white" active-class="active">
            <i class="lni lni-cog"></i>
            <span v-if="!isCollapsed">Creer un compte</span>
          </router-link>
        </li>
        <li class="nav-item" v-if="isClient">
          <router-link to="/dashboardUser" class="nav-link text-white" active-class="active">
            <i class="lni lni-cog"></i>
            <span v-if="!isCollapsed">Tableau de Bord</span>
          </router-link>
        </li>
      </ul>

      <div class="sidebar-footer p-3">
        <div v-if="isLoggedIn">
          <a href="#" class="nav-link text-white" @click.prevent="logout">
            <i class="lni lni-exit"></i>
            <span v-if="!isCollapsed">Deconnecter</span>
          </a>
        </div>
        <div v-else>
          <router-link to="/login" class="nav-link text-white" v-if="!isLoggedIn">
            <i class="lni lni-lock"></i>
            <span v-if="!isCollapsed">Se connecter</span>
          </router-link>
          <router-link to="/register" class="nav-link text-white" v-if="isLoggedIn">
            <i class="lni lni-user-add"></i>
            <span v-if="!isCollapsed">creer un compte</span>
          </router-link>
        </div>
      </div>
    </nav>

    <div v-if="isVisible" class="overlay" @click="closeSidebar"></div>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  data() {
    return {
      isCollapsed: false,
      isVisible: false,
      isLoggedIn: !!localStorage.getItem('token'),
      role: localStorage.getItem('userRole'),
    };
  },
  computed: {
    isAdmin() {
      return this.role === 'admin';
    },
    isAgent() {
      return this.role === 'agent';
    },
    isClient() {
      return this.role === 'client';
    },
    isAdminOrAgent() {
      return this.isAdmin || this.isAgent;
    }
  },
  methods: {
    toggleSidebar() {
      this.isVisible = !this.isVisible;
    },
    closeSidebar() {
      this.isVisible = false;
    },
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('userRole');
      this.isLoggedIn = false;
      this.role = null;
      this.$router.push('/login');
    },
    updateLoginState() {
      this.isLoggedIn = !!localStorage.getItem('token');
      this.role = localStorage.getItem('userRole');
    },
  },
  watch: {
    '$route'(to, from) {
      this.updateLoginState();
    }
  },
  created() {
    window.addEventListener('storage', this.updateLoginState);
  },
  beforeDestroy() {
    window.removeEventListener('storage', this.updateLoginState);
  },
};
</script>

<style scoped>
.sidebar {
  width: 250px;
  transition: transform 0.3s ease;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  transform: translateX(-100%);
  z-index: 1000;
  background-color: #343a40; 
}

.sidebar.active {
  transform: translateX(0);
}

.sidebar-header {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.sidebar-logo {
  color: #ffffff;
}

.nav-link {
  color: #ffffff;
  transition: background-color 0.2s;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.sidebar-footer {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999; 
  display: none;
}

.overlay.active {
  display: block; 
}

@media (min-width: 768px) {
  .sidebar {
    transform: none; 
  }
}
</style>

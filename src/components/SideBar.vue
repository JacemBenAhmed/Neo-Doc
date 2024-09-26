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

    <nav
      :class="['sidebar bg-dark text-white', { 'sidebar-collapsed': isCollapsed }]">
      <div class="sidebar-header d-flex align-items-center justify-content-between p-3">
        <router-link to="/" class="sidebar-logo text-white h5 mb-0">NeoDocs</router-link>
        <button class="btn btn-sm btn-dark d-none d-md-block" @click="toggleSidebar">
          <i :class="['lni', isCollapsed ? 'lni-chevron-right' : 'lni-chevron-left']"></i>
        </button>
      </div>
      <ul class="nav flex-column">
        <li class="nav-item">
          <router-link to="/editProfile" class="nav-link text-white" active-class="active">
            <i class="lni lni-user"></i>
            <span v-if="!isCollapsed">Profile</span>
          </router-link>
        </li>
        <li class="nav-item" v-if="isAdminOrAgent">
          <router-link to="/" class="nav-link text-white" active-class="active">
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
            <span v-if="!isCollapsed">Edit Utilisateurs</span>
          </router-link>
        </li>
        <li class="nav-item" v-if="isAdmin">
          <router-link to="/services" class="nav-link text-white" active-class="active">
            <i class="lni lni-cog"></i>
            <span v-if="!isCollapsed">Services</span>
          </router-link>
        </li>
        <li class="nav-item" v-if="isAdmin">
          <router-link to="/register" class="nav-link text-white" active-class="active">
            <i class="lni lni-cog"></i>
            <span v-if="!isCollapsed">register</span>
          </router-link>
        </li>
        <li class="nav-item" v-if="isClient">
          <router-link to="/dashboardUser" class="nav-link text-white" active-class="active">
            <i class="lni lni-cog"></i>
            <span v-if="!isCollapsed">Dashboard</span>
          </router-link>
        </li>
      </ul>

      <div class="sidebar-footer p-3">
        <div v-if="isLoggedIn">
          <a href="#" class="nav-link text-white" @click.prevent="logout">
            <i class="lni lni-exit"></i>
            <span v-if="!isCollapsed">Logout</span>
          </a>
        </div>
        <div v-else>
          <router-link to="/login" class="nav-link text-white">
            <i class="lni lni-lock"></i>
            <span v-if="!isCollapsed">Login</span>
          </router-link>
          <router-link to="/register" class="nav-link text-white">
            <i class="lni lni-user-add"></i>
            <span v-if="!isCollapsed">Register</span>
          </router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  data() {
    return {
      isCollapsed: false,
      isLoggedIn: !!localStorage.getItem('token'),
      role: localStorage.getItem('userRole')
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
      this.isCollapsed = !this.isCollapsed;
    },
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('userRole'); // Clear user role on logout
      this.isLoggedIn = false;
      this.role = null; 
      this.$router.push('/login');
    },
    updateLoginState() {
      this.isLoggedIn = !!localStorage.getItem('token');
      this.role = localStorage.getItem('userRole'); // Update role on login state change
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
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

.sidebar {
  width: 250px;
  transition: width 0.3s;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
}

.sidebar-collapsed {
  width: 70px;
}

.sidebar-header {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.sidebar-logo-link {
  color: #ffffff;
  font-family: 'Poppins', sans-serif;
}

.nav-link {
  color: #ffffff;
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  transition: background-color 0.2s, padding-left 0.2s;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.nav-link.active {
  background-color: rgba(255, 255, 255, 0.2);
}

.sidebar-nav .nav-item .nav-link {
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
}

.sidebar-nav .nav-item .nav-link i.lni {
  font-size: 1.2rem;
}

.sidebar-nav .nav-item .nav-link span {
  margin-left: 1rem;
}

.sidebar-footer {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.sidebar-footer .nav-link {
  padding: 0.75rem 1rem;
}

@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
    transition: transform 0.3s;
  }

  .sidebar.show {
    transform: translateX(0);
  }

  .sidebar-collapsed {
    width: 250px;
  }
}
</style>

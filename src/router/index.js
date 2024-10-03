import { createRouter, createWebHistory } from 'vue-router';
import DemandeDetails from '@/components/DemandeDetails.vue';
import Login from '@/components/Login.vue';
import Register from '@/components/Register.vue';
import UserList from '@/components/UserList.vue';
import SideBar from '@/components/SideBar.vue';
import Demandes from '@/components/Demandes.vue';
import Services from '@/components/Services.vue';
import addDocs from '@/components/addDocs.vue';
import addDemande from '@/components/addDemande.vue';
import DashboradUser from '@/components/DashboradUser.vue';
import editProfile from '@/components/editProfile.vue';
import RegisterUser from '@/components/RegisterUser.vue';


const routes = [
  {
    path: '/',
    redirect: (to) => {
      const isAuthenticated = !!localStorage.getItem('token'); 
      const userRole = localStorage.getItem('userRole');

      if (isAuthenticated) {
        if (userRole === 'client') {
          return { name: 'DashboardUsr' };
        } else if (userRole === 'agent' || userRole === 'admin') {
          return { name: 'demandes' };
        }
      } else {
        return { name: 'login' };
      }
    }
  },
  {
    name: 'demandes',
    path: '/demandes',
    component: Demandes,
    meta: { requiresAuth: true, roles: ['admin', 'agent'] }, 
  },
  {
    path: '/demande/:id',
    name: 'DemandeDetails',
    component: DemandeDetails,
    props: true,
    meta: { requiresAuth: true, roles: ['admin', 'agent', 'client'] }, 
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: { requiresAuth: true, roles: ['admin'] },
  },
  {
    path: '/registerUser',
    name: 'registerUser',
    component: RegisterUser,
    
  },
  {
    path: '/users',
    name: 'users',
    component: UserList,
    meta: { requiresAuth: true, roles: ['admin'] }, 
  },
  {
    path: '/sideBar',
    name: 'side',
    component: SideBar,
    meta: { requiresAuth: true, roles: ['admin', 'agent', 'client'] }, 
  },
  {
    path: '/services',
    name: 'service',
    component: Services,
    meta: { requiresAuth: true, roles: ['admin'] },
  },
  {
    path: '/addDocs',
    name: 'addDocs',
    component: addDocs,
    meta: { requiresAuth: true, roles: ['admin', 'agent', 'client'] }, 
  },
  {
    path: '/dashboardUser',
    name: 'DashboardUsr',
    component: DashboradUser,
    meta: { requiresAuth: true, roles: ['client','agent','admin'] }, 
  },
  {
    path: '/addDemande',
    name: 'addDemande',
    component: addDemande,
    meta: { requiresAuth: true, roles: ['admin', 'agent', 'client'] }, 
  },
  {
    path: '/editProfile',
    name: 'editProfile',
    component: editProfile,
    meta: { requiresAuth: true, roles: ['admin', 'agent', 'client'] }, 
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token'); 
  const userRole = localStorage.getItem('userRole'); 

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ path: '/login' }); 
  } else if (to.meta.requiresAuth && isAuthenticated && !to.meta.roles.includes(userRole)) {
    next({ path: '/' }); 
  } else {
    next(); 
  }
});

export default router;

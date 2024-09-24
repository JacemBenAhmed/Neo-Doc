import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import DemandeDetails from '@/components/DemandeDetails.vue';
import Login from '@/components/Login.vue' ;
import Register from '@/components/Register.vue' ;
import UserList from '@/components/UserList.vue' ;
import SideBar from '@/components/SideBar.vue';
import Demandes from '@/components/Demandes.vue';
import Services from '@/components/Services.vue';
import addDocs  from '@/components/addDocs.vue';
import addDemande from '@/components/addDemande.vue';

const routes = [
  {
    name: 'demandes',
    path: '/',
    component: Demandes,
  },
  {
    path: '/demande/:id',
    name: 'DemandeDetails',
    component: DemandeDetails,
    props: true
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    
  } ,
  {
    path: '/register',
    name: 'register',
    component: Register,
    
  } , 
  {
    path: '/users',
    name: 'users',
    component: UserList,

    
  } ,
  {
    path: '/sideBar',
    name: 'side',
    component: SideBar,

    
  } ,
  {
    path: '/services',
    name: 'service',
    component: Services,
  }
  ,
  {
    path: '/addDocs',
    name: 'addDocs',
    component: addDocs,
  },
  {
    path: '/addDemande',
    name: 'addDemande',
    component: addDemande,
  }

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

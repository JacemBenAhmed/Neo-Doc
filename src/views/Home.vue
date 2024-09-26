<template>
    <div>
      <Demandes v-if="isAdminOrAgent" />
      <DashboradUser v-if="isClient" />
    </div>
  </template>
  
  <script>
  import Demandes from "@/components/Demandes.vue";
  import DashboradUser from "@/components/DashboradUser.vue";
  
  export default {
    name: "Home",
    components: {
      Demandes,
      DashboradUser
    },
    computed: {
      isAdmin() {
        return localStorage.getItem('userRole') === 'admin';
      },
      isAgent() {
        return localStorage.getItem('userRole') === 'agent';
      },
      isClient() {
        return localStorage.getItem('userRole') === 'client';
      },
      isAdminOrAgent() {
        return this.isAdmin || this.isAgent;
      }
    }
  }
  </script>
  
  <style>
  </style>
  
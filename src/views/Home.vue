<template>
  <div></div>
</template>

<script>
export default {
  name: "Home",
  created() {
    const userRole = localStorage.getItem('userRole');

    if (userRole === 'client') {
      this.$router.push({ name: 'DashboardUsr' });
    } else if (userRole === 'agent' || userRole === 'admin') {
      this.$router.push({ name: 'demandes' });
    } else {
      this.$router.push({ name: 'login' });
    }
  }
}
</script>

<style scoped>
</style>

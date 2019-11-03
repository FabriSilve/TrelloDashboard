<template>
  <section id="page" v-if="!advanced">
    <Header />
    <Dashboard v-if="$store.getters.analyzed"/>
    <Loader v-if="!$store.getters.analyzed"/>
  </section>
  <AdvancedDashboard v-else />
</template>

<script>
import Header from './components/Header';
import Loader from './components/Loader';
import Dashboard from './components/Dashboard';
import AdvancedDashboard from './components/AdvancedDashboard';

export default {
  name: 'App',
  data() {
    return {
      advanced: true,
    };
  },
  components: {
    Header,
    Loader,
    Dashboard,
    AdvancedDashboard,
  },
}
</script>

<style scoped>
#page {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>

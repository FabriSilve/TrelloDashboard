<template>
  <section id="page">
    <Header />
    <Dashboard v-if="$store.getters.analyzed"/>
    <Loader v-if="!$store.getters.analyzed"/>
  </section>
</template>

<script>
import Header from './components/Header';
import Loader from './components/Loader';
import Dashboard from './components/Dashboard';

export default {
  name: 'App',
  components: {
    Header,
    Loader,
    Dashboard,
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

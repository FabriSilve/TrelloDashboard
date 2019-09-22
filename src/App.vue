<template>
  <section id="page">
    <Header />
    <Dashboard />
    <Loader />
  </section>
</template>

<script>
import Header from './components/logic/Header';
import Loader from './components/logic/Loader';

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

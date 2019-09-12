<template>
  <section id="page">
    <Header />
    <Dashboard />
    <Footer />
    <Loader />
  </section>
</template>

<script>
import Header from './components/logic/Header';
import Footer from './components/logic/Footer';
import Loader from './components/logic/Loader';
import Card from './components/logic/Card';

import Dashboard from './components/layout/Dashboard';

export default {
  name: 'App',
  components: {
    Header,
    Footer,
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
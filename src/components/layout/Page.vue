<template>
  <section id="page">
    <Header />
    <slot />
    <Footer />
    <Loader />
  </section>
</template>

<script>
import Header from './Header';
import Footer from './Footer';
import Loader from '../logic/Loader';

export default {
  name: 'Page',
  components: {
    Header,
    Footer,
    Loader,
  }
}
</script>

<style scoped>
#page {
  height: 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
}
</style>
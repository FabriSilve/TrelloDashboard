<template>
  <section id="footer">
    This footer will always be positioned at the bottom of the page, but <strong>not fixed</strong>
    <Menu />
  </section>
</template>

<script>
import Menu from './Menu';

export default {
  name: 'Footer',
  components: {
    Menu,
  }
}
</script>

<style scoped>
#footer {
  /* position: absolute;
  right: 0;
  bottom: 0;
  left: 0; */
  width: 100%;
  padding: 1rem;
  background-color: #efefef;
  text-align: center;
  max-height: 2rem;
    display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  z-index: 2;
}
</style>
<template>
  <section id="footer">
    <p class="link">Developed by <a href="https://github.com/FabriSilve" target="_blank">FabriSilve</a></p>
  </section>
</template>

<script>
export default {
  name: 'Footer',
}
</script>

<style scoped>
#footer {
  color: white;
  text-align: center;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.link {
  height: 1rem;
  padding: 0.5rem;
  margin: 0;
}
</style>
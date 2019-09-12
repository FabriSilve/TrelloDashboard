<template>
  <section id="footer">
    This footer will always be positioned at the bottom of the page, but <strong>not fixed</strong>
  </section>
</template>

<script>
export default {
  name: 'Footer',
}
</script>

<style scoped>
#footer {
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
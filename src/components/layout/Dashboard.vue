<template>
  <section id="dashboard">
    <div class="card">Chart 1</div>
    <div class="card">Chart 2</div>
    <div class="card">Chart 3</div>
    <div class="card">Chart 4</div>
    <div class="card">Chart 5</div>
  </section>
</template>

<script>
export default {
  name: 'dashboard',
}
</script>

<style scoped>
#dashboard {
  margin: 1rem;
  display: flex;
  width: calc(100% - 2rem);
  flex-flow: row wrap;
  align-items: stretch;
  justify-content: space-between;
}

.card {
  width: 30%;
  height: 35vh;
  margin: 0.5rem 0;
  background: #efefef;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
}

.card:first-child {
  width: 65%;
}
</style>
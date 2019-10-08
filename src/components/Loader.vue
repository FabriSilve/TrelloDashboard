<template>
  <section id="fog"> 
    <div class="loader">
      <div v-bind:class="{ animated: $store.getters.loading }" />
      <div v-bind:class="{ animated: $store.getters.loading }" />
      <div v-bind:class="{ animated: $store.getters.loading }" />
      <div v-bind:class="{ animated: $store.getters.loading }" />
      <div v-bind:class="{ animated: $store.getters.loading }" />
    </div>
    <span>Trello Dashboard</span>
  </section>
</template>

<script>
export default {
  name: 'Loader'
}
</script>

<style scoped>
#fog {
  width: 100%;
  margin-top: 20%;
  height: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  align-self: stretch;
  color: white;
  font-size: 120%;
}

.loader {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
  height: 140px;
  padding: 10px;
  margin: 1rem;

  border-bottom: 3px solid grey;
  border-left: 3px solid grey;
}
.loader div {
  margin: 0 5px;
  width: 25px;
  background: #fff;
}

.loader div:nth-child(1) {
  left: 6px;
  animation-delay: -0.80s;
  height: 35px;
}
.loader div:nth-child(2) {
  left: 26px;
  animation-delay: -0.60s;
  height: 55px;
}
.loader div:nth-child(3) {
  left: 45px;
  animation-delay: -0.40s;
  height: 85px;
}
.loader div:nth-child(4) {
  left: 45px;
  animation-delay: -0.20s;
  height: 45px;
}
.loader div:nth-child(5) {
  left: 45px;
  animation-delay: 0;
  height: 65px;
}

.animated {
  animation: loader 1.5s infinite;
}

@keyframes loader {
  0% {
    height: 25px;
  }
  50% {
    height: 105px;
  }
  100% {
    height: 25px;
  }
}


</style>
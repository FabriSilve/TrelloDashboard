<template>
  <!-- <section id="loader" v-if="$store.getters.loading">  -->
  <section id="fog"> 
    <div class="loader">
      <div />
      <div />
      <div />
      <div />
      <div />
    </div>
    <span>Analyzing data...</span>
  </section>
</template>

<script>
export default {
  name: 'Loader'
}
</script>

<style>
#fog {
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(55, 100, 250, 0.8);
  z-index: 3;
}

.loader {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
  position: relative;
  height: 60px;
  padding: 1px;
  margin: 1rem;

  border-bottom: 3px solid rgb(15, 0, 130);
  border-left: 3px solid rgb(15, 0, 130);
}
.loader div {
  margin: 0 3px;
  width: 13px;
  background: #fff;
  animation: loader 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
}
.loader div:nth-child(1) {
  left: 6px;
  animation-delay: -0.40s;
}
.loader div:nth-child(2) {
  left: 26px;
  animation-delay: -0.30s;
}
.loader div:nth-child(3) {
  left: 45px;
  animation-delay: -0.20s;
}
.loader div:nth-child(4) {
  left: 45px;
  animation-delay: -0.10s;
}
.loader div:nth-child(5) {
  left: 45px;
  animation-delay: 0;
}
@keyframes loader {
  0% {
    height: 15px;
  }
  50% {
    height: 55px;
  }
  100% {
    height: 15px;
  }
}


</style>
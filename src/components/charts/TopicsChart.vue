<template>
  <div v-if="$store.getters.topicsSeries">
    <apexchart type=radar height=350 :options="chartOptions" :series="$store.getters.topicsSeries" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      chartOptions: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        title: {
          text: 'Basic Radar Chart'
        }
      }
    }
  }
}
</script>
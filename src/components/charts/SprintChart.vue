<template>
  <div v-if="$store.getters.sprintSeries">
    <apexchart type="bar" height="300" :options="chartOptions" :series="$store.getters.sprintSeries" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      chartOptions: {
        plotOptions: {
          bar: {
            horizontal: true,
          }
        },
        dataLabels: {
          enabled: false
        },
      }
    }
  }
}
</script>
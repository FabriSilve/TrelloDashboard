<template>
  <div v-if="$store.getters.sprintSeries">
    <apexchart type=bar height=350 :options="chartOptions" :series="$store.getters.sprintSeries" />
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
        xaxis: {
          categories: ['South Korea', 'Canada', 'United Kingdom', 'Netherlands', 'Italy', 'France', 'Japan',
            'United States', 'China', 'Germany'
          ],
        }
      }
    }
  }
}
</script>
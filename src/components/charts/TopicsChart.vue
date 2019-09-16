<template>
  <div id="chart">
    <apexchart type=radar height=350 :options="chartOptions" :series="series" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      series: [{
        name: 'Series 1',
        data: [80, 50, 30, 40, 100, 20],
      }],
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
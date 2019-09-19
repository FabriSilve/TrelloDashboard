<template>
  <div v-if="$store.getters.topicsSeries">
    <apexchart
      type="radar"
      height="200"
      :options="{ ...chartOptions, labels: $store.getters.topicsLabels }"
      :series="$store.getters.topicsSeries"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      chartOptions: {
        chart: {
          dropShadow: {
            enabled: true,
            blur: 1,
            left: 1,
            top: 1
          },
        },
        title: {
            text: 'Sprint Topics'
        },
        stroke: {
            width: 0
        },
        fill: {
            opacity: 0.4
        },
        markers: {
            size: 0
        },
      },
      // series: [23, 11, 54, 72, 12],
      // labels: ["Apple", "Mango", "Banana", "Papaya", "Orange"]
    }
  }
}
</script>
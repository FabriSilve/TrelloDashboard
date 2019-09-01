<template>
  <section>
    <apexchart height="200px" width="60%" type="line" :options="chartOptions" :series="series"/>
  </section>
</template>

<script>
export default {
  data() {
    return {
      chartOptions: {
        xaxis: {
          type: "datetime",
          categories: [
            "2019-01-01",
            "2019-02-01",
            "2019-03-01",
            "2019-04-01",
            "2019-05-01",
            "2019-06-01",
            "2019-07-01"
          ]
        }
      },
      series: [
        {
          name: "WebsiteHits",
          data: [15, 20, 21, 25, 60, 120, 93]
        }
      ]
    };
  }
}
</script>
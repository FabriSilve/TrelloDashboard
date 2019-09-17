<template>
  <div class="fill" v-if="$store.getters.trendSeries">
    <apexchart 
      height="100%"
      :options="chartOptions" 
      :series="$store.getters.trendSeries"
    />
  </div>
</template>

<script>
import colours from '../../constants/colours';

export default {
  data() {
    return {
      chartOptions: {
        stroke: {
          width: [1, 2, 2],
          curve: 'smooth'
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '10%',
            endingShape: 'rounded',	
          },
        },
        colors: [
          colours.ORANGE,
          colours.PURPLE,
          colours.RED,
        ],
        fill: { opacity: [0.8, 0.4,1] },
        markers: {
          size: 0
        },
        xaxis: {
          type:'datetime',
          forceNiceScale: true,
          tickAmount: 1,
          labels: {
            show: false,
            style: {
              colors: colours.BLUE,
              fontSize: '10px',
            }
          },
          axisBorder: {
            show: false,
          },
          // title: { text: 'days'},
          axisTicks: {
              show: false,
              borderType: 'solid',
              color: 'gray',
              height: 4,
              offsetX: 0,
              offsetY: 0
          },
        },
        yaxis: {
          min: 0,
          opposite: true,
          forceNiceScale: true,
          labels: {
            show: false,
            style: {
              color: colours.BLUE,
            }
          },
        },
        chart: {
          type: 'line',
          width: '100%',
          toolbar: { show: false },
          background: 'transparent',
        },
        grid: {
          show: true,
          yaxis: {
            lines: {
              show: false,
            }
          },
          padding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          },
        },
        legend: {
          position: 'top',
          labels: {
            useSeriesColors: true
          },
          onItemHover: {
            highlightDataSeries: true
          },
           onItemClick: {
            toggleDataSeries: false
          },
        }
      },
    };
  }
}
</script>

<style scoped>
.fill {
  display: flex;
}
</style>
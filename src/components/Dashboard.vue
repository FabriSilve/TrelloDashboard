<template>
  <section id="dashboard">
    <div class="container-fluid">
      <div class="row mt-4">
        <div class="col-md-8">
          <div class="box shadow mt-2">
            <apexchart
            v-if="$store.getters.trendSeries"
            height="430"
            :options="trendOptions"
            :series="$store.getters.trendSeries"
          />
          </div>
        </div>
        <div class="col-md-4">
          <div class="box shadow mt-2">
            <apexchart
              v-if="$store.getters.daySeries"
              height="530"
              type=radialBar
              :options="{ ...dayOptions, labels: $store.getters.dayLabels }"
              :series="$store.getters.daySeries"
            />
          </div>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-md-4">
          <div class="box shadow">
            <apexchart
              v-if="$store.getters.sprintSeries"
              type=bar
              height="430"
              :options="sprintOptions"
              :series="$store.getters.sprintSeries"
            />
          </div>
        </div>
        <div class="col-md-4">
          <div class="box shadow">
            <apexchart
              v-if="$store.getters.topicsSeries"
              type="radar"
              height="430"
              :options="{ ...topicsOptions, labels: $store.getters.topicsLabels }"
              :series="$store.getters.topicsSeries"
            />
          </div>
        </div>
        <div class="col-md-4">
          <div class="box">
            <WarningTable />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import trendOptions from '../chartOptions/trendOptions'
import dayOptions from '../chartOptions/dayOptions'
import sprintOptions from '../chartOptions/sprintOptions'
import topicsOptions from '../chartOptions/topicsOptions'

import DayChart from './charts/DayChart';
import TopicsChart from './charts/TopicsChart';
import SprintChart from './charts/SprintChart';

import WarningTable from './charts/WarningTable';

export default {
  name: 'dashboard',
  components: {
    DayChart,
    TopicsChart,
    SprintChart,
    WarningTable,
  },
  data() {
    return {
      trendOptions,
      dayOptions,
      sprintOptions,
      topicsOptions,
    }
  }
}
</script>

<style scoped>
#dashboard {
  max-width: 2500px;
  width: 100%;
  margin: 0 auto;
}

.box {
  height: 100%;
  background-color: #2B2D3E;
  padding: 5px 0;
}
</style>

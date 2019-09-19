<template>
  <section id="dashboard">
    <div class="container-fluid">
      <div class="row mt-4">
        <div class="col-md-8">
          <div class="box shadow mt-2">
            <apexchart 
            v-if="$store.getters.trendSeries"
            height="350"
            :options="trendOptions" 
            :series="$store.getters.trendSeries"
          />
          </div>
        </div>
        <div class="col-md-4">
          <div class="box shadow mt-2">
            <apexchart
              v-if="$store.getters.daySeries"
              type=radialBar
              height="350"
              :options="dayOptions"
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
              height="350"
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
              height="350"
              :options="topicsOptions" 
              :series="$store.getters.topicsSeries"
            />
          </div>
        </div>
        <div class="col-md-4">
          <div class="box shadow">
            <WarningTable />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import trendOptions from '../../chartOptions/trendOptions'
import dayOptions from '../../chartOptions/dayOptions'
import sprintOptions from '../../chartOptions/sprintOptions'
import topicsOptions from '../../chartOptions/topicsOptions'

import DayChart from '../charts/DayChart';
import TopicsChart from '../charts/TopicsChart';
import SprintChart from '../charts/SprintChart';

import WarningTable from '../charts/WarningTable';

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
/* 
  display: flex;
  height: 100%;
  flex-flow: row wrap;
  align-items: stretch;
  justify-content: space-between; */
}

.box {
  /* max-height: 500px; */
  height: 100%;
  background-color: #2B2D3E;
  padding: 1rem 1rem;
  /* width: 32%;
  margin: 1% 0;
  display: flex;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24); */
}
</style>
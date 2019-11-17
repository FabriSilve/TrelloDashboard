<template>
  <section id="dashboard">
    <div class="container-fluid">
      <div class="row mt-4">
        <div class="col-md-8">
          <div class="box pt-2 mt-2">
            <TrendChart
              :series="$store.getters.trendSeries"
            />
          </div>
        </div>
        <div class="col-md-4">
          <div class="box pt-2 mt-2">
            <BurnChart
              v-if="$store.getters.analysis.advanced"
              :series="$store.getters.analysis.advanceSeries"
            />
            <RadialChart
              v-else
              :series="$store.getters.daySeries"
              :labels="$store.getters.dayLabels"
            />
          </div>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-md-4">
          <div class="box pt-2">
            <BarChart
              :series="$store.getters.sprintSeries"
            />
          </div>
        </div>
        <div class="col-md-4">
          <div class="box pt-2">
            <RadarChart
              :series="$store.getters.topicsSeries"
              :labels="$store.getters.topicsLabels"
            />
          </div>
        </div>
        <div class="col-md-4">
          <div class="box">
            <TicketsTable
               v-if="$store.getters.blockedTickets"
              :blockedTickets="$store.getters.blockedTickets"
              :toValidateTickets="$store.getters.toValidateTickets"
              :doingTickets="$store.getters.doingTickets"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import BarChart from './charts/BarChart';
import RadarChart from './charts/RadarChart';
import TrendChart from './charts/TrendChart';
import RadialChart from './charts/RadialChart';
import BurnChart from './charts/BurnChart';

import TicketsTable from './TicketsTable';

export default {
  name: 'dashboard',
  components: {
    TicketsTable,
    BarChart,
    RadarChart,
    TrendChart,
    RadialChart,
    BurnChart,
  },
  data() {
    return {
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
  padding: 0;
}

.no-work {
  border: 1px solid grey;
  margin: 35% auto;
  padding: 1rem;
  width: 95%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

</style>

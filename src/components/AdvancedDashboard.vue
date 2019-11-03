<template>
  <section id="dashboard">
    <Box width="60%" height="60%">
      <SprintChart
        :series="$store.getters.demo.goalSeries"
        :widthUnit="widthUnit"
        :heightUnit="heightUnit"
        />
    </Box>
    <Box width="60%" height="35%">
      <Box width="60%" height="100%">
        <BarChart
          :series="$store.getters.demo.sprintSeries"
          :widthUnit="widthUnit"
        />
      </Box>
      <Box width="40%" height="100%">
        <RadarChart
          :series="$store.getters.demo.topicsSeries"
          :labels="$store.getters.demo.topicsLabels"
          :heightUnit="heightUnit"
        />
      </Box>
    </Box>
    <Box width="60%" height="5%" justify="flex-start" direction="row">
      <p style="margin: 0">Developed with ❤️ by <a href="https://github.com/FabriSilve" target="_blank">FabriSilve</a></p>
    </Box>
    <Box width="40%" height="95%" direction="column">
      <Box width="100%" height="15%">
        <Summary />
      </Box>
      <Box width="100%" height="65%" >
        <TicketsTable
          :blockedTickets="[]"
          :toValidateTickets="$store.getters.demo.blockedTickets"
          :doingTickets="$store.getters.demo.blockedTickets"
        />
      </Box>
      <Box width="100%" height="20%">
        <TrendChart
          :series="$store.getters.demo.trendSeries"
          :widthUnit="widthUnit"
          :heightUnit="heightUnit"
        />
      </Box>
    </Box>
    <Box width="40%" height="5%" justify="flex-end" direction="row">
      <Settings />
    </Box>
  </section>
</template>

<script>

import TicketsTable from './TicketsTable';
import RadarChart from './charts/RadarChart';
import BarChart from './charts/BarChart';
import SprintChart from './charts/SprintChart';
import TrendChart from './charts/TrendChart';

import Box from '../styled/Box';

import Settings from './Settings';
import Summary from './Summary';

export default {
  name: 'advanced-dashboard',
  components: {
    RadarChart,
    BarChart,
    SprintChart,
    TrendChart,
    TicketsTable,
    Box,
    Settings,
    Summary,
  },
  computed: {
    heightUnit: function() {
      return (window.innerHeight
        || document.documentElement.clientHeight
        || document.body.clientHeight) / 100;
    },
    widthUnit: function() {
      return (window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth) / 100;
    },
  }
}
</script>

<style scoped>
#dashboard {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin: 2vh 1vw;
  width: 98vw;
  height: 96vh;
}

</style>
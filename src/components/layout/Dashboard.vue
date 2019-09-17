<template>
  <section id="dashboard">
    <div class="card"><TrendChart /></div>
    <!-- <div class="card"><DayChart /></div>
    <div class="card"><SprintChart /></div> -->
    <!-- <div class="card"><TopicsChart /></div> -->
    <!-- <div class="card"><WarningTable /></div> -->
  </section>
</template>

<script>
import TrendChart from '../charts/TrendChart';
import DayChart from '../charts/DayChart';
import TopicsChart from '../charts/TopicsChart';
import SprintChart from '../charts/SprintChart';

import WarningTable from '../charts/WarningTable';

export default {
  name: 'dashboard',
  components: {
    TrendChart,
    DayChart,
    TopicsChart,
    SprintChart,
    WarningTable,
  }
}
</script>

<style scoped>
#dashboard {
  margin: 0 2%;
  display: flex;
  width: 96%;
  height: 100%;
  flex-flow: row wrap;
  align-items: stretch;
  justify-content: space-between;
}

.card {
  width: 32%;
  height: 40%;
  /* height: auto; */
  margin: 1% 0;
  background: #f3f3f3;
  border-radius: 0.5rem;
  display: flex;
  align-items: stretch;
  justify-content: center;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
}

.card:first-child {
  width: 66%;
}
</style>
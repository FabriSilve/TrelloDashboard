<template>
  <section id="header">
    <span class="menu-item">{{day}}</span>
    <span class="menu-item">
      <span v-if="$store.getters.organisation" >
        {{$store.getters.organisation.name}}
      </span>
      <span v-if="$store.getters.organisation && $store.getters.currentSprint" >&nbsp;&nbsp;|&nbsp;&nbsp;</span>
      <span v-if="$store.getters.currentSprint" >
        {{$store.getters.currentSprint}}
      </span>
    </span>
    <Settings />
  </section>
</template>

<script>
import moment from 'moment';

import Settings from './Settings';

export default {
  name: 'Header',
  components: {
    Settings,
  },
  data() {
    return {
      day: moment().format('DD MMM YYYY'),
    }
  },
}
</script>

<style scoped>
#header {
  padding: 0.5rem 1rem;
  background-color: rgb(106, 106, 216);
  color: white;
  font-weight: bold;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.menu-item {
  display: flex;
  justify-content: center;
  align-items: center;
}
.menu-item:first-child {
  justify-content: flex-start;
}
.menu-item:last-child {
  justify-content: flex-end;
  cursor: pointer;
}
</style>
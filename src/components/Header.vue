<template>
  <section id="header">
    <span class="menu-item">{{day}}</span>
    <span
      class="menu-item"
      v-if="$store.getters.organisation"
    >
      {{$store.getters.organisation.name}}
    </span>
    <Menu :show="show" @menu-display="display" />
    <span class="menu-display" @click="display">
      {{show ? 'close' : 'menu'}}
    </span>
  </section>
</template>

<script>
import moment from 'moment';

import Menu from './Menu';

export default {
  name: 'Header',
  components: {
    Menu,
  },
  data() {
    return {
      day: moment().format('DD MMM YYYY'),
      show: false,
    }
  },
  methods: {
    display: function() {
      this.show = !this.show;
    },
  }
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
  width: 15%;
  display: flex;
  justify-content: center;
}
.menu-item:first-child {
  justify-content: flex-start;
}
.menu-item:last-child {
  justify-content: flex-end;
  cursor: pointer;
}
</style>
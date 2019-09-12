<template>
  <section id="header">
    <span class="menu-item">{{day}}</span>
    <span class="menu-item">{{time}}</span>
    <span class="menu-item" @click="display">
      {{show ? 'close' : 'menu'}}
      <Menu :show="show" />
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
      time: moment().format('HH:mm'),
      day: moment().format('DD MMM YYYY'),
      show: false,
    }
  },
  mounted: function() {
    var self = this;

    setInterval(function() {
      console.log('call')
        self.time = moment().format('HH:mm'); 
    }, 60000);
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
  background-color: #efefef;
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
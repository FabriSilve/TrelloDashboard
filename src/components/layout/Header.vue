<template>
  <section id="header">
    <span>{{day}}</span>
    <span>Trello Dashboard</span>
    <span>{{time}}</span>
  </section>
</template>

<script>
import moment from 'moment';

export default {
  name: 'Header',
  data() {
    return {
      time: moment().format('HH:mm'),
      day: moment().format('DD MMM YYYY'),
    }
  },
  mounted: function() {
    var self = this;

    setInterval(function() {
      console.log('call')
        self.time = moment().format('HH:mm'); 
    }, 60000);
  }
}
</script>

<style scoped>
#header {
  /* position: absolute;
  right: 0;
  top: 0;
  left: 0; */
  width: 100%;
  padding: 1rem;
  background-color: #efefef;
  max-height: 1.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  z-index: 2;
}
</style>
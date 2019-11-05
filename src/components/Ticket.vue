<template>
  <div
    class="ticket"
    v-bind="ticket"
    :key="ticket.id"
  >
    <div class="row header">
      <span class="number">{{number}}</span>
      <span class="label">{{labels}}</span>
      <span class="since">~ {{since}}</span>
    </div>
    <div class="row">
      <span class="title">{{title}}</span>
      <span class="points">{{ticket.points}}</span>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

const cardNumber = (url) => url
  .match(/\/([0-9]+)[^-]/)[0];

export default {
  name: 'Ticket',
  props: ['ticket'],
  computed: {
    title: function() {
      if (this.ticket.name.length < 130) return this.ticket.name;
      return `${this.ticket.name.substring(0, 130)}...`;
    },
    since: function() {
      const duration = moment.duration(moment().diff(this.ticket.day));
      const minutes = Math.ceil(duration.asMinutes());
      const hours = Math.ceil(duration.asHours());
      const days = Math.ceil(duration.asDays());

      if (minutes < 120) return `${minutes} m`;
      if (hours < 24) return `${hours} h`;
      return `${days} d`;
    },
    number: function() {
      return cardNumber(this.ticket.url).slice(1);
    },
    labels: function() {
      return this.ticket.labels.map(l => l.name).join(' - ');
    }
  },
}
</script>

<style scoped>
.ticket {
  margin: 0.5rem auto;
  /* padding: 1rem; */
  width: 100%;
  min-height: 4rem;
  background-color: #374462;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  color: white;
  border: 1px solid grey;
  border-radius: 5px;
}

.row {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.header {
  background: rgb(106, 106, 216);
  border-bottom: 1px solid grey;
}

.title {
  width: calc(100% - 4rem - 5px);
  padding: 5px;
  font-size: 110%;
}

.number, .since {
  padding: 1px 5px;
  background: #374462;
  border: 1px solid grey;
}

.points {
  height: 2rem;
  min-width: 2rem;
  margin: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: orange;
  border-radius: 1rem;
  font-weight: bold;
}
</style>
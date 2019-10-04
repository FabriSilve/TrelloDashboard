<template>
  <div
    class="ticket"
    v-bind="ticket"
    :key="ticket.id"
  >
    <span class="num">{{ticket.num}}</span>
    <span class="since">{{since}}</span>
    <span class="title">{{title}}</span>
    <span class="points">{{ticket.points}}</span>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Ticket',
  props: ['ticket'],
  computed: {
    title: function() {
      return this.ticket.name.length > 130
        ? `${this.ticket.name.substring(0, 130)}...`
        : this.ticket.name;
    },
  },
}
</script>

<style scoped>
.ticket {
  margin: 0.5rem auto;
  padding: 1rem;
  width: 100%;
  min-height: 4rem;
  background-color: #374462;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  color: white;
  border: 1px solid grey;
}

.points {
  height: 2rem;
  min-width: 2rem;
  margin: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: orange;
  border-radius: 1rem;
  font-weight: bold;
}
</style>
<template>
  <div
    id="tickets-table"
  >
    <div
      id="warnings-tickets"
      v-if="mainTickets.length > 0"
      v-bind:class="{ alert: isAlert }"
    >
      <div class="title">
        <span>{{listTitle}}</span>
      </div>
      <div class="tickets-list">
        <Ticket
          v-for="ticket in mainTickets"
          :key="ticket.id"
          :ticket="ticket"
        />
      </div>
    </div>
    <div v-else class="no-ticket">
      No tickets need special attention
    </div>
  </div>
</template>

<script>
import Ticket from './Ticket';

export default {
  name: 'TicketsTable',
  components: {
    Ticket,
  },
  props: [
    'blockedTickets',
    'toValidateTickets',
    'doingTickets',
  ],
  computed: {
    isAlert: function() {
      if (
        !this.blockedTickets
        || !this.toValidateTickets
      ) return false;
      return this.blockedTickets.length > 0
        || this.toValidateTickets.length > 0;
    },
    listTitle: function() {
      if (this.blockedTickets.length > 0) return '⚠️ Tickets Blocked ⚠️';
      if (this.toValidateTickets.length > 0) return '🔍 Tickets to validate 🔎';
      if (this.doingTickets.length > 0) return '⏳ Tickets in Progress ⌛️';
      return '';
    },
    mainTickets: function() {
      if (this.blockedTickets.length > 0) return this.blockedTickets;
      if (this.toValidateTickets.length > 0) return this.toValidateTickets;
      if (this.doingTickets.length > 0) return this.doingTickets;
      return [];
    },
  },
}
</script>

<style scoped>
#tickets-table {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  height: 100%;
  width: 100%;
}

#warnings-tickets {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  padding: 2%;
  height: 100%;
  width: 100%;
  margin: 0;
}

.title {
  margin: 0.5rem auto;
  font-size: 24px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 100%;
}

.tickets-list {
  width: 100%;
  height: inherit;
  overflow-y: scroll;
  scrollbar-width: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

.no-ticket {
  border: 1px solid grey;
  margin: 2rem auto;
  padding: 1rem;
  width: 95%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.alert {
  animation: pulse 2s infinite;
}

.alert > #warnings-tickets > .title {
  color: orange;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0px 50px red;
    border: red solid 4px;
  }
  50% {
    box-shadow: 0 0px 50px yellow;
    border: yellow solid 4px;
  }
  100% {
    box-shadow: 0 0px 50px red;
    border: red solid 4px;
  }
}

</style>
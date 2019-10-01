<template>
  <div
    id="tickets-table"
    v-bind:class="{ alert: isAlert }">
    <div
      id="warnings-tickets"
      v-if="blockedTickets.length > 0"
    >
      <div class="title">
        <span>⚠️ Tickets Blocked ⚠️</span>
      </div>
      <div class="tickets-list">
        <div
          class="ticket"
          v-for="ticket in blockedTickets"
          :key="ticket.id"
        >
          <!-- <span class="ticket-day">{{ticket.day}}</span> -->
          <span class="ticket-title">{{ticket.name.length > 130 ? `${ticket.name.substring(0, 130)}...` : ticket.name}}</span>
          <span class="points">{{ticket.points}}</span>
        </div>
      </div>
    </div>
    <div
      id="warnings-tickets"
      v-else-if="toValidateTickets.length > 0"
    >
      <div class="title">
        <span>🔍 Tickets to validate 🔎</span>
      </div>
      <div class="tickets-list">
        <div
          class="ticket"
          v-for="ticket in toValidateTickets"
          :key="ticket.id"
        >
          <!-- <span class="ticket-day">{{ticket.day}}</span> -->
          <span class="ticket-title">{{ticket.name.length > 130 ? `${ticket.name.substring(0, 130)}...` : ticket.name}}</span>
          <span class="points">{{ticket.points}}</span>
        </div>
        <div
          v-if="!isAlert"
          class="no-ticket"
          @click="test()"
        >
          No tickets need special attention
        </div>
      </div>
    </div>
    <div
      id="warnings-tickets"
      v-else-if="doingTickets.length > 0"
    >
      <div class="title">
        <span>⏳ Tickets in Progress ⌛️</span>
      </div>
      <div class="tickets-list">
        <div
          class="ticket"
          v-for="ticket in doingTickets"
          :key="ticket.id"
        >
          <!-- <span class="ticket-day">{{ticket.day}}</span> -->
          <span class="ticket-title">{{ticket.name.length > 130 ? `${ticket.name.substring(0, 130)}...` : ticket.name}}</span>
          <span class="points">{{ticket.points}}</span>
        </div>
      </div>
    </div>
    <div
      v-else
      class="no-ticket"
      @click="test()"
    >
      No tickets need special attention
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'TicketsTable',
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
  },
}
</script>

<style scoped>
#tickets-table {
  display: flex;
  flex-direction: column;
  align-items: center;
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
  height: 350px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

.ticket {
  margin: 0.5rem auto;
  padding: 1rem;
  width: 95%;
  min-height: 4rem;
  background-color: #374462;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  color: white;
  border: 1px solid grey;
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
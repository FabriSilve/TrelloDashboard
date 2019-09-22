<template>
  <div
    id="warning-table"
    v-if="$store.getters.warningsTickets"
    v-bind:class="{ alert: $store.getters.warningsTickets.length > 0 }"
  >
    <div class="title">
      <span v-if="$store.getters.warningsTickets.length > 0">⚠️</span>
      <span>Ticket Alerts</span>
      <span v-if="$store.getters.warningsTickets.length > 0">⚠️</span>
    </div>
    <div class="tickets-list">
      <div
        class="ticket"
        v-for="ticket in $store.getters.warningsTickets"
        :key="ticket.id"
      >
        <span class="ticket-title">{{ticket.name}}</span>
        <span class="points">{{ticket.points}}</span>
        
      </div>
      <div
        v-if="$store.getters.warningsTickets.length === 0"
        class="no-ticket"
      >
        No tickets need special attention
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WarningTable',
  data() {
    return {
      isAlert: true,
    }
  }
}
</script>

<style scoped>
#warning-table {
  display: flex;
  flex-direction: column;
  align-items: center;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

.ticket {
  margin: 0.5rem auto;
  padding: 1rem;
  width: 95%;
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
  width: 2rem;
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

.alert > .title {
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
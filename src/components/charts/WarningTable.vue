<template>
  <div
    id="warning-table"
    v-bind:class="{ alert: $store.getters.warningsTickets.length > 0 }"
    v-if="$store.getters.warningsTickets"
  >
    <div class="title">
      <span v-if="$store.getters.warningsTickets.length > 0">⚠️</span>
      <span>Ticket Alerts</span>
      <span v-if="$store.getters.warningsTickets.length > 0">⚠️</span>
    </div>
    <div class="tickets-list" v-if="$store.getters.warningsTickets.length > 0">
      <div
        class="ticket"
        v-for="ticket in $store.getters.warningsTickets"
        :key="ticket.id"
      >
        {{ticket.name}} - {{ticket.points}}
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
  padding: 0.5rem;
  width: 90%;
  border: red solid 1px;
  background-color: #374462;
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
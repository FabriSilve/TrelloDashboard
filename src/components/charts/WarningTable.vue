<template>
  <div id="table" class="alert" v-if="$store.getters.warningsTickets">
    <div
      v-for="ticket in $store.getters.warningsTickets"
      :key="ticket.id"
    >
      {{ticket.name}} - {{ticket.points}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'WarningTable',
}
</script>

<style>
#table {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 3%;
  padding: 2%;
  border-radius: 0.5rem;
  width: 85%;
  height: 85%;
  background-color: #e1e1e1;
}

.alert {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0px 20px rgba(255, 0, 0, 0.808), 0 0px 20px rgba(255, 0, 0, 0.24);
    border: yellow solid 2px;
  }
  50% {
    box-shadow: 0 0px 20px rgba(255, 123, 0, 0.808), 0 0px 20px rgba(255, 123, 0, 0.44);
    border: red solid 2px;
  }
  100% {
    box-shadow: 0 0px 20px rgba(255, 0, 0, 0.808), 0 0px 20px rgba(255, 0, 0, 0.24);
    border: yellow solid 2px;
  }
}

</style>
<template>
  <div class="card" :style="style">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: ['size'],
  computed: {
    style () {
      return 'width: ' + (8 * this.size) + '%;';
    }
  },
  props: {
    size: {
      type: Number,
      default: '10',
    },
  },
}
</script>

<style>
.card {
  margin: 1%;
  padding: 1rem;
  height: 35%;
  background: #efefef;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
}
</style>
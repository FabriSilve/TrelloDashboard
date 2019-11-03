<template>
  <Box justify="space-around" height="100%" width="100%" align="flex-start">
    <Box height="100%" width="30%" justify="flex-start">
      <h1 class="no-margin">Moank</h1>
    </Box>
    <Box height="100%" width="30%">
      <h4 class="no-margin org">18:00</h4>
    </Box>
    <Box height="100%" width="30%" justify="flex-end">
      <h4 class="no-margin">Wed 12 Nov</h4>
    </Box>
  </Box>
</template>

<script>
import moment from 'moment';

import Box from '../styled/Box';

export default {
  components: {
    Box,
  },
};
</script>

<style scoped>
.org {
  font-weight: 1000;
  font-size: 3rem;
}

.no-margin {
  margin: 0;
}
</style>
<template>
  <div id="menu" v-if="show">
    <p>Menu</p>
    <button v-if="token" @click="logout">Logout</button>
    <button v-if="!!board" @click="refresh">Refresh Data</button>
    <button v-if="!token" @click="useDemo">Try Demo</button>
    <button v-if="!token" @click="authenticate">Authenticate</button>
    <select
      v-if="boards.length > 0"
      v-model="board"
    >
      <option value="" disabled selected>Select the board</option>
      <option
        v-for="board in boards"
        :value="board"
        :key="board.id"
        :disabled="board.closed"
        >
      {{ board.name }}
      </option>
    </select>
    <Footer />
  </div>
</template>

<script>
import Footer from './Footer';

import demoAnalysis from '../demo/analysis';

import analyze from '../utils/analyze';

import trello from '../api/trello';


export default {
  name: 'Menu',
  props: ['show'],
  components: {
    Footer,
  },
  data () {
    return {
      boards: [],
      board: '',
      lists: [],
      token: null,
    }
  },
  mounted: function() {
    this.checkToken();
  },
  methods: {
    logout: function() {
      trello.logout();
    },
    refresh: function() {
      this.$store.commit('loadingStart')
      this.runAnalysis();
      this.hide();
    },
    authenticate: async function() {
      this.$store.commit('loadingStart')
      await trello.authenticate();
      this.$store.commit('loadingEnd')
    },
    getBoards: async function () {
      this.$store.commit('loadingEnd')
      const result = await trello.getBoards();
      this.boards = result.map(({ id, name, closed }) => ({ id, name, closed }))
    },
    runAnalysis: async function () {
      try {
        const analysis = await analyze(this.board.id);
        this.$store.commit('updateAnalysis', analysis);
      } catch (e) {
        this.clearStorage;
      }
      this.$store.commit('loadingEnd');
    },
    useDemo: function() {
      this.$store.commit('updateAnalysis', demoAnalysis);
    },
    hide () {
      this.$emit('menu-display')
    },
    checkToken: function() {
      const authToken = localStorage.getItem('trello_token');
      if (!!authToken) return this.token = authToken;
      var self = this;
      setTimeout(function() {
        self.checkToken();
      }, 1000);
    }
  },
  watch: {
    board: function() {
      this.$store.commit('loadingStart');
      this.runAnalysis();
      var self = this;
      setInterval(function() {
        self.runAnalysis(); 
      }, 60000);
      this.hide();
    },
    token: function() {
      this.getBoards();
    }
  },
}
</script>

<style scoped>
#togled {
  z-index: 2;
}
#menu {
  width: 350px;
  height: 100vh;
  position: fixed;
  top: 0;
  right: 0;
  padding: 1rem;
  background:rgba(106, 106, 216, 0.8);
  border-radius: 1rem 0 0 1rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;

  z-index: 1;
}
#menu > * {
  margin: 1rem 0;
}
</style>


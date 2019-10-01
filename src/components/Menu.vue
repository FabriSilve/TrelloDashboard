<template>
  <div id="menu" v-if="show">
    <p>Menu</p>
    <button v-if="!auth" @click="useDemo">
      Try Demo
    </button>
    <button v-if="!auth" @click="authenticate">
      authenticate with trello
    </button>
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


export default {
  name: 'Menu',
  props: ['show'],
  components: {
    Footer,
  },
  data () {
    return {
      auth: false,
      boards: [],
      board: '',
      lists: [],
    }
  },
  mounted: function() {
    if (!!localStorage.getItem('trello_token')) this.authenticate();
  },
  methods: {
    clearStorage: function(error) {
      console.error(error);
      localStorage.removeItem('trello_token');
    },
    authenticate: async function() {
      this.$store.commit('loadingStart')
      try {
        await Trello.authorize({
          name: "Trello Dashboard",
          type: "popup",
          scope: { read: 'true' },
          expiration: '1day',
        });
        this.getBoards();
      } catch (e) {
        this.clearStorage();
      }
    },
    getBoards: async function () {
      this.$store.commit('loadingEnd')
      try { 
        const result = await Trello.get(
          "member/me/boards",
        )
        this.auth = true;
        this.boards = result.map(({ id, name, closed }) => ({ id, name, closed }))
      } catch(e) {
        this.clearStorage();
      }
    },
    getCards: async function () {
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
    }
  },
  watch: {
    board: function() {
      this.$store.commit('loadingStart');
      this.getCards();
      var self = this;
      setInterval(function() {
        self.getCards(); 
      }, 60000);
      this.hide();
    }
  }
}
</script>

<style scoped>
#togled {
  z-index: 2;
}
#menu {
  width: 300px;
  height: 80%;
  position: fixed;
  top: 7%;
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


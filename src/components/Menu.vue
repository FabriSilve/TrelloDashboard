<template>
  <div id="menu" v-if="show">
    <p>Menu</p>
    <button v-if="!auth" @click="useDemo">
      Try Demo
    </button>
    <button v-if="!auth" @click="authenticateWithTrello">
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

const processLists = (lists, callback) => callback(lists);

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
    }
  },
  methods: {
    authenticateWithTrello: function() {
      this.$store.commit('loadingStart')
      Trello.authorize({
        name: "Trello Dashboard",
        type: "popup",
        scope: { read: 'true' },
        expiration: '1hour',
        success: this.getBoards,
        error: (err) => console.error(err),
      })
    },
    getBoards: function () {
      this.$store.commit('loadingEnd')
      Trello.get("member/me/boards", (result) => {
        this.auth = true;
        this.boards = result.map(({ id, name, closed }) => ({ id, name, closed }))
      })
    },
    getCards: function () {
      this.$store.commit('loadingStart')
      Trello.get(
        `/boards/${this.board.id}`,
        {
          cards: 'open',
          card_fields: 'dateLastActivity,name,shortUrl,labels',
          filter: 'open',
          fields: 'cards,name',
          lists: 'open',
          organisation: true,
        },
        (lists) => {
          console.log(JSON.stringify(lists, null, 2));
          
         this.lists = lists;
         this.$store.commit('loadingEnd')
         processLists(lists, this.saveAnalysis);
        }
      )

    },
    saveAnalysis: function (analysis) {
      this.$store.commit('updateAnalysis', analysis);
    },
    useDemo: function() {
      this.$store.commit('updateAnalysis', demoAnalysis);
    }
  },
  watch: {
    board: function() {
      this.getCards();
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


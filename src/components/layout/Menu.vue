<template>
  <nav role='navigation'>
    <button @click="display">
      {{show ? 'close' : 'menu'}}
    </button>
    <div v-if="show" id="menu">
      <p>settings</p>
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
      <button @click="display">
        {{show ? 'close' : 'menu'}}
      </button>
    </div>
  </nav>
</template>

<script>

const processLists = (lists, callback) => callback(lists);

export default {
  name: 'Menu',
  data () {
    return {
      auth: false,
      show: false,
      boards: [],
      board: '',
    }
  },
  methods: {
    display: function() {
      this.show = !this.show;
    },
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
         this.show = false;
         processLists(lists, this.saveAnalysis);
        }
      )

    },
    saveAnalysis: function (analysis) {
      this.$store.commit('updateAnalysis', analysis);
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
  height: 60%;
  position: fixed;
  top: 15%;
  right: 0;
  padding: 2rem 1rem;
  background:chocolate;

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


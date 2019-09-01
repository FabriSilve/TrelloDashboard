<template>
  <section >
    <section>
      <span>Board:</span>
      <select
        v-if="boards.length"
        v-model="boardSelected"
      >
        <option value="" disabled>Select the board</option>
        <option
          v-for="board in boards"
          :value="board"
          :key="board.id"
          :disabled="board.closed"
          >
        {{ board.name }}
        </option>
      </select>
      <span v-bind:id="loading">loading {{loading > 0}}</span>
    </section>
    <section>
      <ul>
        <li v-bind:key="data" v-for="data in analysis">
          {{data.name}} - {{data.cards}}
        </li>
      </ul>
    </section>
  </section>
</template>

<script>
// TODO: unisntall
// import axios from 'axios'

import FirstChart from './components/FirstChart'

import processLists from './utils/processLists';

export default {
  name: 'app',
  components: {
    FirstChart,
  },
  data () {
    return {
      loading: 0,
      boards: [],
      boardSelected: '',
      lists: [],
      analysis: {},
    }
  },
  mounted: function() { this.authenticate(); },
  methods: {
    fetchCards: function(boardId) {
      this.loading += 1;
      Trello.get(
        `/boards/${boardId}/lists`,
        {
          cards: 'open',
          card_fields: 'all',
          filter: 'open',
          fields: 'all',
        },
        (list) => {
         this.lists = list;
         this.loading -= 1;
        }
      )
    },
    getBoards: function () {
      Trello.get("member/me/boards", (result) => {
        this.boards = result.map(({ id, name, closed }) => ({ id, name, closed }))
        this.loading -= 1;
      })
    },
    authenticate: function() {
      this.loading += 1;
      Trello.authorize({
        name: "Trello Dashboard",
        type: "popup",
        scope: { read: 'true' },
        expiration: '1hour',
        success: this.getBoards,
        error: (err) => console.error(err),
      })
    }
  },
  watch: {
    boardSelected: function (board) { this.fetchCards(board.id); },
    lists: function (lists) { 
      this.loading += 1;
      this.analysis = processLists(lists);
      this.loading -= 1;
    }
  },
}
</script>

<style>
</style>

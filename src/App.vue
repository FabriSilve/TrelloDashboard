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
      <TrendChart />
      <DayChart />
      <SprintChart />
      <TopicsChart />
    </section>
  </section>
</template>

<script>
import TrendChart from './components/TrendChart'
import DayChart from './components/DayChart'
import SprintChart from './components/SprintChart'
import TopicsChart from './components/TopicsChart'

import processLists from './utils/processLists';

import demoBoards from './demo/boards'
import demoLists from './demo/lists'

const demo = true;

export default {
  name: 'app',
  components: {
    TrendChart,
    DayChart,
    SprintChart,
    TopicsChart,
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
  // TODO: ask autentication with button instead
  mounted: function() { this.authenticate(); },
  methods: {
    fetchCards: function(boardId) {
      this.loading += 1;
      if (demo) {
        this.lists = demoLists;
        this.loading -= 1;
      } else {
        Trello.get(
        `/boards/${boardId}/lists`,
        {
          // TODO: raffinate fields requested
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
      }
    },
    getBoards: function () {
      Trello.get("member/me/boards", (result) => {
        // console.log(JSON.stringify(result, null, 2))
        this.boards = result.map(({ id, name, closed }) => ({ id, name, closed }))
        this.loading -= 1;
      })
    },
    authenticate: function() {
      this.loading += 1;
      if (demo) {
        this.boards = demoBoards.map(({ id, name, closed }) => ({ id, name, closed }));
        this.loading -= 1;
      } else {
        Trello.authorize({
        name: "Trello Dashboard",
        type: "popup",
        scope: { read: 'true' },
        expiration: '1hour',
        success: this.getBoards,
        error: (err) => console.error(err),
      })
      }
    }
  },
  watch: {
    boardSelected: function (board) { this.fetchCards(board.id); },
    lists: function (lists) { 
      this.loading += 1;
      this.analysis = processLists(lists);
      console.log(JSON.stringify(this.analysis, null, 2));
      
      this.loading -= 1;
    }
  },
}
</script>

<style>
</style>

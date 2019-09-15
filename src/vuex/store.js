import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    loading: 0,
    analysis: {}
  },
  mutations: {
    loadingStart (state) {
      state.loading++;
    },
    loadingEnd (state) {
      if (state.loading > 0) state.loading--;
    },
    updateAnalysis (state, analysis) {
      state.analysis = analysis;
    }
  },
  getters: {
    loading: state => state.loading,
    analysis: state => state.analysis,
    trendSeries: state => state.analysis.trendSeries,
  }
})

export default store;
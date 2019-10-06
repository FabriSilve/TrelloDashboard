import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    loading: 0,
    analysis: {
      analyzed: false,
    }
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
    analyzed: state => state.analysis.analyzed,
    trendSeries: state => state.analysis.trendSeries,
    isWorkingDay: state => state.analysis.isWorkingDay,
    daySeries: state => state.analysis.daySeries,
    dayLabels: state => state.analysis.dayLabels,
    sprintSeries: state => state.analysis.sprintSeries,
    topicsSeries: state => state.analysis.topicsSeries,
    topicsLabels: state => state.analysis.topicsLabels,
    blockedTickets: state => state.analysis.blockedTickets,
    toValidateTickets: state => state.analysis.toValidateTickets,
    doingTickets: state => state.analysis.doingTickets,
    organisation: state => state.analysis.organisation,
  }
})

export default store;
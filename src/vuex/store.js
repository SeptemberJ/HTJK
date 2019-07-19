import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

const state = {
  useName: 'liubai',
  curContractNo: '',
  resultDataOrigin: []
}

const actions = {
  updateContractNo ({commit, state}, ContractNo) {
    commit('setCurContractNo', ContractNo)
  },
  updateResultData ({commit, state}, Data) {
    commit('setResultData', Data)
  }
}

const mutations = {
  setCurContractNo (state, ContractNo) {
    state.curContractNo = ContractNo
  },
  setResultData (state, Data) {
    state.resultDataOrigin = Data
  }
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  plugins: [vuexLocal.plugin]
})

import Vue from 'vue'
import Vuex from 'vuex'
// import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

// const vuexLocal = new VuexPersistence({
//   storage: window.localStorage
// })

const state = {
  useName: 'liubai',
  curContractNo: ''
}

const actions = {
  updateContractNo ({commit, state}, ContractNo) {
    commit('setCurContractNo', ContractNo)
  }
}

const mutations = {
  setCurContractNo (state, ContractNo) {
    state.curContractNo = ContractNo
  }
}

export default new Vuex.Store({
  state,
  actions,
  mutations
  // plugins: [vuexLocal.plugin]
})

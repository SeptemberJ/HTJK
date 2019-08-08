import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

const state = {
  useName: 'liubai',
  userInfo: null,
  pathName: null,
  curContractNo: '',
  resultDataOrigin: []
}

const actions = {
  updateContractNo ({commit, state}, ContractNo) {
    commit('setCurContractNo', ContractNo)
  },
  updateResultData ({commit, state}, Data) {
    commit('setResultData', Data)
  },
  updateUserInfo ({commit, state}, UserInfo) {
    commit('setUserInfo', UserInfo)
  },
  changePath ({commit, state}, PATH) {
    commit('setPath', PATH)
  }
}

const mutations = {
  setCurContractNo (state, ContractNo) {
    state.curContractNo = ContractNo
  },
  setResultData (state, Data) {
    state.resultDataOrigin = Data
  },
  setUserInfo (state, UserInfo) {
    state.userInfo = UserInfo
  },
  setPath (state, PATH) {
    state.pathName = PATH
  }
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  plugins: [vuexLocal.plugin]
})

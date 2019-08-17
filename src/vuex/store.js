import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

let CurYear = (new Date()).getFullYear()

const state = {
  useName: 'liubai',
  userInfo: null,
  pathName: null,
  curContractNo: '',
  resultDataOrigin: [],
  formFilter: {
    signDepartment: '全部',
    contractSumS: '',
    contractSumE: '',
    contractPrice: -1,
    signYear: CurYear,
    warnTip: -1,
    signAndFinish: -1,
    fileConditionn: -1,
    classCondition: -1,
    receivablesContion: -1,
    performBond: -1,
    qualityBond: -1,
    shipmentRate: '',
    receivablesRate: '',
    inQuality: -1,
    subItems: -1,
    sort: '',
    // vagueSearch: ''
    contractNo: '', // XSHT002089
    customer: '',
    projectNumber: ''
  }
}

const actions = {
  updateContractNo ({commit, state}, ContractNo) {
    commit('setCurContractNo', ContractNo)
  },
  updateResultData ({commit, state}, Data) {
    commit('setResultData', Data)
  },
  updateFilterCondition ({commit, state}, Data) {
    commit('setFilterCondition', Data)
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
  setFilterCondition (state, Data) {
    state.formFilter = Data
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

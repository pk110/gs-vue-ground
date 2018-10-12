import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    storesMessage:'',
    search:''
  },
  getters: {
    storesMessage(state){
      return state.storesMessage
    },
    search(state){
      return state.search
    }
  },
  mutations: {
    
  },
  actions: {
    
  },
  modules: {
    
  }
})

export default store
import Vuex from 'vuex'

export default () => {
  return new Vuex.Store({
    state: {
      title: 'vuex'
    },
    mutations: {
      updateTitle(state, title) {
        state.title = title
      }
    }
  })
}
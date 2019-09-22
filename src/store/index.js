import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth'
import movie from './movie'
import profile from './profile'

Vue.use(Vuex)

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      auth,
      movie,
      profile
    },
    strict: false
  })

  return Store
}

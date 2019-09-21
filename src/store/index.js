import Vue from 'vue'
import Vuex from 'vuex'

import Auth from './auth'

Vue.use(Vuex)

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      Auth
    },
    strict: process.env.DEV
  })

  return Store
}

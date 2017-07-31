import {
  SHELL_SET_CURRENTROUTE
} from '../mutation-types'

const routes = [
  { position: 0, name: 'execution.reader', title: 'Leitura' },
  { position: 1, name: 'execution.processor', title: 'Processador' }
]
const firstPosition = routes[0].position
const lastPosition = routes[routes.length - 1].position
const currentRoute = routes[firstPosition]

const state = {
  routes,
  firstPosition,
  lastPosition,
  currentRoute
}

const mutations = {
  [SHELL_SET_CURRENTROUTE] (state, direction) {
    state.currentRoute = state.routes[state.currentRoute.position + direction]
  }
}

export default {
  state,
  mutations
}

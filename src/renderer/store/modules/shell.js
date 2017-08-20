import {
  SHELL_SET_CURRENTROUTE
  // SHELL_SET_TOGGLEISLOADING
} from '@/store/mutation-types'

const readerRoute = { position: 0, name: 'execution.reader', title: 'Leitura' }
const processorRoute = { position: 1, name: 'execution.processor', title: 'Processador' }
const exporterRoute = { position: 2, name: 'execution.exporter', title: 'Exportador' }
const routes = [readerRoute, processorRoute, exporterRoute]
const firstPosition = routes[0].position
const lastPosition = routes[routes.length - 1].position
const currentRoute = routes[firstPosition]

const state = {
  routes,
  firstPosition,
  lastPosition,
  currentRoute
}

const getters = {
  currentRoute: state => state.currentRoute,
  lastPosition: state => state.routes.length - 1
}

const mutations = {
  // [SHELL_SET_TOGGLEISLOADING](state) {
  //   state.isLoading = !state.isLoading
  // },
  [SHELL_SET_CURRENTROUTE](state, { direction, router }) {
    state.currentRoute = state.routes[state.currentRoute.position + direction]
    router.push({ name: state.currentRoute.name })
  }
}

const actions = {
  // [SHELL_SET_TOGGLEISLOADING]({ commit }) {
  //   commit(SHELL_SET_TOGGLEISLOADING)
  // },
  [SHELL_SET_CURRENTROUTE]({ commit }, { direction, router }) {
    commit(SHELL_SET_CURRENTROUTE, { direction, router })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}

import {
  READER_SET_DIRECTORY,
  READER_SET_PATTERN
} from '@/store/mutation-types'

const directory = '/'
const flagDirectory = true
const pattern = '**/*.xml'

const state = {
  directory,
  flagDirectory,
  pattern
}

const mutations = {
  [READER_SET_DIRECTORY](state, directory) {
    state.directory = directory
  },
  [READER_SET_PATTERN](state, pattern) {
    state.pattern = pattern
  }
}

const actions = {
  [READER_SET_DIRECTORY]({ commit }, directory) {
    commit(READER_SET_DIRECTORY, directory)
  },
  [READER_SET_PATTERN]({ commit }, pattern) {
    commit(READER_SET_PATTERN, pattern)
  }
}

export default {
  state,
  mutations,
  actions
}

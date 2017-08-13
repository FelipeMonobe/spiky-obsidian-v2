import {
  READER_SET_DIRECTORY,
  READER_SET_PATTERN
} from '../mutation-types'

const directory = '/'
const pattern = '**/*.xml'

const state = {
  directory,
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

export default {
  state,
  mutations
}

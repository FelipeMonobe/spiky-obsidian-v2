import {
  PROCESSOR_SET_XMLS,
  PROCESSOR_SET_MODELS,
  PROCESSOR_SET_XMLSBYMODEL,
  PROCESSOR_SET_XMLUNIQUEPROPS,
  PROCESSOR_SET_RAWXMLS,
  PROCESSOR_SET_XMLPROPERTIES,
  PROCESSOR_SET_PLUCKEDXMLS
} from '../mutation-types'

const state = {
  xmls: [],
  rawXmls: [],
  xmlsByModel: [],
  xmlsUniqueProps: [],
  xmlProperties: [],
  pluckedXmls: [],
  xmlModels: [
    { text: 'Selecione uma opção...', value: null, disabled: true }
  ]
}

const mutations = {
  [PROCESSOR_SET_PLUCKEDXMLS](state, pluckedXmls) {
    state.pluckedXmls = pluckedXmls
  },
  [PROCESSOR_SET_XMLS](state, xmls) {
    state.xmls = xmls
  },
  [PROCESSOR_SET_RAWXMLS](state, rawXmls) {
    state.rawXmls = rawXmls
  },
  [PROCESSOR_SET_XMLUNIQUEPROPS](state, uniqueXmlSamplesProps) {
    state.xmlsUniqueProps = uniqueXmlSamplesProps
  },
  [PROCESSOR_SET_XMLSBYMODEL](state, xmlsByModel) {
    state.xmlsByModel = xmlsByModel
  },
  [PROCESSOR_SET_MODELS](state, models) {
    state.xmlModels = state.xmlModels.splice(0, 1).concat(models)
  },
  [PROCESSOR_SET_XMLPROPERTIES](state, properties) {
    state.xmlProperties = properties
  }
}

export default {
  state,
  mutations
}

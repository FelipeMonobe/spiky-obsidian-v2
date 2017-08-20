import { readXmlFrom } from '@/services/reader'
import { extractXmls, pluckXmls, normalizeXmls, previewXmlModel } from '@/services/processor'
import {
  PROCESSOR_EXTRACTXMLS,
  PROCESSOR_NORMALIZEXMLS,
  PROCESSOR_PREVIEWXMLMODEL,
  PROCESSOR_SET_XMLS,
  PROCESSOR_SET_MODELS,
  PROCESSOR_SET_XMLSBYMODEL,
  PROCESSOR_SET_XMLUNIQUEPROPS,
  PROCESSOR_SET_RAWXMLS,
  PROCESSOR_SET_XMLPROPERTIES,
  PROCESSOR_SET_PLUCKEDXMLS
} from '@/store/mutation-types'

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

const getters = {
  xmls: state => state.xmls,
  xmlsByModel: state => state.xmlsByModel,
  xmlModels: state => state.xmlModels,
  xmlsUniqueProps: state => state.xmlsUniqueProps,
  rawXmls: state => this.$store.state.processor.rawXmls
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

const actions = {
  [PROCESSOR_SET_XMLPROPERTIES]({ commit }, properties) {
    commit(PROCESSOR_SET_XMLPROPERTIES, properties)
  },
  async [PROCESSOR_EXTRACTXMLS]({ commit }, rawXmls) {
    const { xmls, xmlModels } = await extractXmls(rawXmls)

    commit(PROCESSOR_SET_XMLS, xmls)
    commit(PROCESSOR_SET_MODELS, xmlModels)
  },
  [PROCESSOR_NORMALIZEXMLS]({ commit }, { xmlsByModel, xmlProperties }) {
    const pluckedXmls = pluckXmls(xmlsByModel, xmlProperties)
    const normalizedXmls = normalizeXmls(pluckedXmls)

    commit(PROCESSOR_SET_PLUCKEDXMLS, normalizedXmls)
  },
  [PROCESSOR_PREVIEWXMLMODEL]({ commit }, { model, xmls }) {
    const { uniqueXmlSamplesProps, xmlsByModel } = previewXmlModel(model, xmls)

    commit(PROCESSOR_SET_XMLUNIQUEPROPS, uniqueXmlSamplesProps)
    commit(PROCESSOR_SET_XMLSBYMODEL, xmlsByModel)
  },
  async [PROCESSOR_SET_RAWXMLS]({ commit }, { directory, pattern }) {
    const rawXmls = await readXmlFrom(directory, pattern)

    commit(PROCESSOR_SET_RAWXMLS, rawXmls)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}

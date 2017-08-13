<template>
  <section>
    <div class="row">
      <div class="col">
        <strong>Objetivos:</strong>
        <ol>
          <li>Definir modelo de XML;</li>
          <li>Definir propriedades para extração;</li>
        </ol>
      </div>
    </div>
  
    <div class="row">
      <div class="col">
        <b-form>
          <b-form-fieldset description="Modelo de NFe para processamento" label="Modelo">
            <b-form-select v-model="selectedModel" :options="xmlModels" @input="previewXmlModel">
            </b-form-select>
          </b-form-fieldset>
          <b-form-fieldset description="Propriedades do modelo para extração" label="Propriedades">
            <div role="group" class="custom-controls-stacked" style="height: 200px; overflow-y: scroll; padding-left: 5px">
              <b-form-checkbox name="xmlProperties" v-for="(property, index) in xmlsUniqueProps" v-model="xmlProperties" :key="index" :value="property">{{property}}</b-form-checkbox>
            </div>
          </b-form-fieldset>
        </b-form>
      </div>
    </div>
  </section>
</template>

<script>
import { mapMutations } from 'vuex'

import UtilObject from '../utils/object'
import ProcessorService from '../services/processor'
import {
  PROCESSOR_SET_XMLS,
  PROCESSOR_SET_MODELS,
  PROCESSOR_SET_XMLUNIQUEPROPS,
  PROCESSOR_SET_XMLSBYMODEL,
  PROCESSOR_SET_XMLPROPERTIES
} from '../store/mutation-types'
const R = require('ramda')
const UtilArray = require('../utils/array')

// //////////////////////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////// COMPONENT DEFINITION ///////////////////////////////////////
// //////////////////////////////////////////////////////////////////////////////////////////////

const componentName = 'processor'
const componentData = function() {
  return {
    rawXmls: this.$store.state.processor.rawXmls,
    selectedModel: null
  }
}
const componentComputed = {
  xmls: { get: getXmls },
  xmlModels: { get: getXmlModels },
  xmlsUniqueProps: { get: getXmlUniqueProps },
  xmlProperties: { get: getXmlProperties, set: setXmlProperties }
}
const componentMethods = {
  previewXmlModel,
  ...mapMutations([
    PROCESSOR_SET_XMLS,
    PROCESSOR_SET_MODELS,
    PROCESSOR_SET_XMLUNIQUEPROPS,
    PROCESSOR_SET_XMLSBYMODEL,
    PROCESSOR_SET_XMLPROPERTIES
  ])
}

// //////////////////////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////// PUBLIC FUNCTIONS ///////////////////////////////////////
// //////////////////////////////////////////////////////////////////////////////////////////////

function previewXmlModel(value) {
  const getXmlsByModel = UtilArray.filterByObjectPropertyName(value)
  const xmlsByModel = getXmlsByModel(this.xmls)

  const uniqueXmlSamplesProps = R.pipe(
    R.map(x => x[value]),
    R.map(x => UtilObject.getLastNodes(x, value)),
    R.reduce((x, y) => x.concat(y), []),
    R.uniq
  )(xmlsByModel)

  this[PROCESSOR_SET_XMLPROPERTIES]([])
  this[PROCESSOR_SET_XMLUNIQUEPROPS](uniqueXmlSamplesProps)
  this[PROCESSOR_SET_XMLSBYMODEL](xmlsByModel)
}

// //////////////////////////////////////////////////////////////////////////////////////////////
// //////////////////////////////////// GETTERS & SETTERS ///////////////////////////////////////
// //////////////////////////////////////////////////////////////////////////////////////////////

function getXmls() {
  return this.$store.state.processor.xmls
}
function getXmlModels() {
  return this.$store.state.processor.xmlModels
}
function getXmlUniqueProps() {
  return this.$store.state.processor.xmlsUniqueProps
}
function getXmlProperties() {
  return this.$store.state.processor.xmlProperties
}
function setXmlProperties(value) {
  this[PROCESSOR_SET_XMLPROPERTIES](value)
}

// //////////////////////////////////////////////////////////////////////////////////////////////
// //////////////////////////////////// PRIVATE FUNCTIONS ///////////////////////////////////////
// //////////////////////////////////////////////////////////////////////////////////////////////

async function componentBeforeRouteEnter(to, from, next) {
  next(vm => {
    _extractXmlModels.apply(vm)
  })
}

async function componentBeforeRouteLeave(to, from, next) {
  _pluckProperties()
}

async function _extractXmlModels() {
  const xmls = await ProcessorService.parseToXml(this.rawXmls)
  const xmlsGroupedByModel = UtilArray.groupByFirstProperty(xmls)
  const xmlModelKeys = Object.keys(xmlsGroupedByModel)
  const xmlModels = xmlModelKeys.map(x => ({
    text: `${x} (${xmlsGroupedByModel[x].length})`,
    value: x
  }))

  this[PROCESSOR_SET_XMLS](xmls)
  this[PROCESSOR_SET_MODELS](xmlModels)
}

async function _pluckProperties() {
  const pluckedXmls = ProcessorService.pluckXmls(this.xmlsByModel, this.xmlProperties)

  // //////////////////////////////////////////////////////////////////////////////////////////////
  // //////////////////////////////////////// REFATORAR ///////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////////////////////////////////

  const [multiple, single] = R
    .partition(x => Object
      .keys(x)
      .map(y => x[y])
      .some(y => Array.isArray(y))
    , pluckedXmls)

  const replicated = multiple
    .map(x => {
      const [arrayProps, otherProps] = R.partition(y => Array.isArray(x[y]), Object.keys(x))
      const sample = arrayProps[0]
      const result = []
      let qty = x[sample].length

      R.times(n => {
        const body = {}

        otherProps.forEach(y => {
          body[y] = x[y]
        })

        arrayProps.forEach(y => {
          body[y] = x[y][n]
        })

        result.push(body)
      }, qty)

      return result
    })

  const final = replicated
    .reduce((acc, curr) => acc.concat(curr), [])
    .concat(single)

  // //////////////////////////////////////////////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////////////////////////////////

  console.log(final)
}

// //////////////////////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////// EXPORTATION ////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////////////////////////////////

export default {
  name: componentName,
  data: componentData,
  computed: componentComputed,
  methods: componentMethods,
  beforeRouteEnter: componentBeforeRouteEnter,
  beforeRouteLeave: componentBeforeRouteLeave
}
</script>

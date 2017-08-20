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
            <b-form-select :options="xmlModels" @input="previewXmlModel">
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
import { mapActions, mapGetters, mapState } from 'vuex'

import {
  PROCESSOR_EXTRACTXMLS,
  PROCESSOR_NORMALIZEXMLS,
  PROCESSOR_PREVIEWXMLMODEL,
  PROCESSOR_SET_XMLS,
  PROCESSOR_SET_MODELS,
  PROCESSOR_SET_XMLUNIQUEPROPS,
  PROCESSOR_SET_XMLSBYMODEL,
  PROCESSOR_SET_XMLPROPERTIES,
  PROCESSOR_SET_PLUCKEDXMLS
} from '@/store/mutation-types'

const componentName = 'processor'

const componentMethods = {
  previewXmlModel,
  ...mapActions([
    PROCESSOR_EXTRACTXMLS,
    PROCESSOR_NORMALIZEXMLS,
    PROCESSOR_PREVIEWXMLMODEL,
    PROCESSOR_SET_XMLS,
    PROCESSOR_SET_MODELS,
    PROCESSOR_SET_XMLUNIQUEPROPS,
    PROCESSOR_SET_XMLSBYMODEL,
    PROCESSOR_SET_XMLPROPERTIES,
    PROCESSOR_SET_PLUCKEDXMLS
  ])
}

const componentComputed = {
  ...mapState({
    rawXmls: state => state.processor.rawXmls
  }),
  ...mapGetters([
    'xmls',
    'xmlModels',
    'xmlsByModel',
    'xmlsUniqueProps'
  ]),
  xmlProperties: {
    get() { return this.$store.state.processor.xmlProperties },
    set(properties) { this[PROCESSOR_SET_XMLPROPERTIES](properties) }
  }
}

function previewXmlModel(model) {
  this[PROCESSOR_SET_XMLPROPERTIES]([])
  this[PROCESSOR_PREVIEWXMLMODEL]({ model, xmls: this.xmls })
}

async function componentBeforeRouteEnter(to, from, next) {
  next(vm => vm[PROCESSOR_EXTRACTXMLS](vm.rawXmls))
}

async function componentBeforeRouteLeave(to, from, next) {
  await this[PROCESSOR_NORMALIZEXMLS]({
    xmlsByModel: this.xmlsByModel,
    xmlProperties: this.xmlProperties
  })

  next()
}

export default {
  name: componentName,
  computed: componentComputed,
  methods: componentMethods,
  beforeRouteEnter: componentBeforeRouteEnter,
  beforeRouteLeave: componentBeforeRouteLeave
}
</script>

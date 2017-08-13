<template>
  <section>
    <div class="row">
      <div class="col">
        <strong>Objetivos:</strong>
        <ol>
          <li>Definir diretório de leitura;</li>
          <li>Definir padrão de busca;</li>
        </ol>
      </div>
    </div>
    <div class="row">
      <div class="col-6">
        <b-form>
          <b-form-fieldset description="Pasta onde buscará pelo padrão de busca." label="Diretório">
            <b-form-file :directory="flagDirectory" v-model="directory"></b-form-file>
          </b-form-fieldset>
          <b-form-fieldset description="Padrão de nome dos arquivos." label="Padrão">
            <b-form-input type="text" placeholder="Padrão blob" v-model="pattern"></b-form-input>
          </b-form-fieldset>
        </b-form>
      </div>
    </div>
  </section>
</template>

<script>
import { mapMutations } from 'vuex'

import ReaderService from '../services/reader'
import {
  READER_SET_DIRECTORY,
  READER_SET_PATTERN,
  PROCESSOR_SET_RAWXMLS
} from '../store/mutation-types'

// //////////////////////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////// COMPONENT DEFINITION ///////////////////////////////////////
// //////////////////////////////////////////////////////////////////////////////////////////////

const componentName = 'reader'
const componentData = function() {
  return {
    flagDirectory: true
  }
}
const componentComputed = {
  directory: { get: getDirectory, set: setDirectory },
  pattern: { get: getPattern, set: setPattern }
}
const componentMethods = {
  ...mapMutations([
    READER_SET_DIRECTORY,
    READER_SET_PATTERN,
    PROCESSOR_SET_RAWXMLS
  ])
}

// //////////////////////////////////////////////////////////////////////////////////////////////
// //////////////////////////////////// GETTERS & SETTERS ///////////////////////////////////////
// //////////////////////////////////////////////////////////////////////////////////////////////

function getDirectory() {
  return this.$store.state.reader.directory
}

function getPattern() {
  return this.$store.state.reader.pattern
}

function setDirectory(value) {
  this[READER_SET_DIRECTORY](value)
}

function setPattern(value) {
  this[READER_SET_PATTERN](value)
}

// //////////////////////////////////////////////////////////////////////////////////////////////
// //////////////////////////////////// PRIVATE FUNCTIONS ///////////////////////////////////////
// //////////////////////////////////////////////////////////////////////////////////////////////

// _readAndStoreRawXmls (directory: String, pattern: String): Promise<Void>
async function _readAndStoreRawXmls(directory, pattern) {
  const xmls = await ReaderService.readXmlFrom(directory, pattern)

  return xmls
}
// function _onRouteChange (): Void
async function componentBeforeRouteLeave(to, from, next) {
  const xmls = await _readAndStoreRawXmls(this.directory.path, this.pattern)
  this[PROCESSOR_SET_RAWXMLS](xmls)
  next()
}

// //////////////////////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////// EXPORTATION ////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////////////////////////////////

export default {
  name: componentName,
  data: componentData,
  computed: componentComputed,
  methods: componentMethods,
  beforeRouteLeave: componentBeforeRouteLeave
}
</script>

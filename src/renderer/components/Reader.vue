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
import { mapActions, mapState } from 'vuex'

import {
  READER_SET_DIRECTORY,
  READER_SET_PATTERN,
  PROCESSOR_SET_RAWXMLS
} from '@/store/mutation-types'

const componentName = 'reader'

const componentComputed = {
  ...mapState({
    flagDirectory: state => state.reader.flagDirectory
  }),
  directory: {
    get() { return this.$store.state.reader.directory },
    set(directory) { this[READER_SET_DIRECTORY](directory) }
  },
  pattern: {
    get() { return this.$store.state.reader.pattern },
    set(pattern) { this[READER_SET_PATTERN](pattern) }
  }
}

const componentMethods = {
  ...mapActions([
    READER_SET_DIRECTORY,
    READER_SET_PATTERN,
    PROCESSOR_SET_RAWXMLS
  ])
}

async function componentBeforeRouteLeave(to, from, next) {
  await this[PROCESSOR_SET_RAWXMLS]({
    directory: this.directory.path,
    pattern: this.pattern
  })

  next()
}

export default {
  name: componentName,
  computed: componentComputed,
  methods: componentMethods,
  beforeRouteLeave: componentBeforeRouteLeave
}
</script>

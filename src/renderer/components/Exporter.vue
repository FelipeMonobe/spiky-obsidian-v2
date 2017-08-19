<template>
  <section>
    <div class="row">
      <div class="col">
        <strong>Objetivos:</strong>
        <ol>
          <li>Definir propriedades para consolidar (somatório);</li>
          <li>Definir caminho para salvar arquivo XLSX;</li>
        </ol>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <button class="btn btn-success" @click="selectDirectory">Salvar</button>
      </div>
    </div>
  </section>
</template>

<script>
import ExporterService from '../services/exporter'

const componentName = 'exporter'
const componentData = function() {
  return {
    pluckedXmls: this.$store.state.processor.pluckedXmls
  }
}
const componentMethods = {
  selectDirectory
}

function selectDirectory() {
  debugger
  ExporterService.openDirectoryDialog(this.pluckedXmls)
}

export default {
  name: componentName,
  data: componentData,
  methods: componentMethods
}
</script>

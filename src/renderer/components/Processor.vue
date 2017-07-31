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
    <div class="col-5">
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
const componentName = 'processor'

export default {
  name: componentName
}
</script>

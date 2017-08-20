<template>
  <section>
    <!-- <backdrop></backdrop> -->
    <div class="container-fluid">
      <b-card class="shellContainer" img="http://placeskull.com/200/200/551a8b/43/0" :title="currentRoute.title" show-footer>
        <transition name="fade">
          <router-view></router-view>
        </transition>
        <div slot="footer">
          <b-button class="float-left" @click="navigate(-1)" v-show="currentRoute.position !== 0">
            <i class="fa fa-arrow-left"></i> Voltar
          </b-button>
          <b-button class="float-right" @click="navigate(1)" v-show="currentRoute.position !== lastPosition">
            Avançar
            <i class="fa fa-arrow-right"></i>
          </b-button>
        </div>
      </b-card>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import { SHELL_SET_CURRENTROUTE } from '@/store/mutation-types'

const componentName = 'shell'

const componentComputed = {
  ...mapGetters([
    'lastPosition',
    'currentRoute'
  ])
}

const componentMethods = {
  navigate,
  ...mapActions([
    SHELL_SET_CURRENTROUTE
  ])
}

function navigate(direction) {
  this[SHELL_SET_CURRENTROUTE]({
    direction,
    router: this.$router
  })
}

export default {
  name: componentName,
  computed: componentComputed,
  methods: componentMethods
}
</script>

<style>
.shellContainer {
  margin: -1px -15px -1px -16px;
}
</style>

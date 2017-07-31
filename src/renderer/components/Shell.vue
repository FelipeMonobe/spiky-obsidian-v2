<template>
  <section>
    <div class="container-fluid">
      <b-card
        class="shellContainer"
        img="http://placeskull.com/200/200/551a8b/43/0"
        :title="currentRoute.title"
        show-footer>

        <!-- CONTENT -->
        <router-view></router-view>

        <div slot="footer">
          <b-button
            class="float-left"
            @click="navigate(-1)"
            v-show="currentRoute.position !== firstPosition">
              <i class="fa fa-arrow-left"></i> Voltar
          </b-button>
          <b-button
            class="float-right"
            @click="navigate(1)"
            v-show="currentRoute.position !== lastPosition">
              Avançar <i class="fa fa-arrow-right"></i>
          </b-button>
        </div>
      </b-card>
    </div>
  </section>
</template>

<script>
import { mapMutations } from 'vuex'

import { SHELL_SET_CURRENTROUTE } from '../store/mutation-types'

// //////////////////////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////// COMPONENT DEFINITION ///////////////////////////////////////
// //////////////////////////////////////////////////////////////////////////////////////////////

const componentName = 'shell'

const componentData = function () {
  return {
    routes: this.$store.state.shell.routes,
    firstPosition: 0,
    lastPosition: this.$store.state.shell.routes.length - 1
  }
}

const componentComputed = {
  currentRoute: getCurrentRoute
}

const componentMethods = {
  navigate,
  ...mapMutations([ SHELL_SET_CURRENTROUTE ])
}

// //////////////////////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////// METHODS ////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////////////////////////////////

// navigate (direction: Number): Void
async function navigate ({ direction, onEnter }) {
  this[SHELL_SET_CURRENTROUTE](direction)
  this.$router.push(this.currentRoute.name, onEnter)
}

// //////////////////////////////////////////////////////////////////////////////////////////////
// //////////////////////////////////// GETTERS & SETTERS ///////////////////////////////////////
// //////////////////////////////////////////////////////////////////////////////////////////////

function getCurrentRoute () {
  return this.$store.state.shell.currentRoute
}

// //////////////////////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////// EXPORTATION ////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////////////////////////////////

export default {
  name: componentName,
  data: componentData,
  computed: componentComputed,
  methods: componentMethods
}
</script>

<style>
.shellContainer {
  margin: -1px -15px -1px -16px;
}
</style>

<template>
  <section>
  
    <div class="backdrop" v-show="isLoading">
      <div class="sk-folding-cube">
        <div class="sk-cube1 sk-cube"></div>
        <div class="sk-cube2 sk-cube"></div>
        <div class="sk-cube4 sk-cube"></div>
        <div class="sk-cube3 sk-cube"></div>
      </div>
    </div>
  
    <div class="container-fluid">
      <b-card class="shellContainer" img="http://placeskull.com/200/200/551a8b/43/0" :title="currentRoute.title" show-footer>
  
        <transition name="fade">
          <router-view></router-view>
        </transition>
  
        <div slot="footer">
          <b-button class="float-left" @click="navigate(-1)" v-show="currentRoute.position !== firstPosition">
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
import { mapMutations } from 'vuex'

import { SHELL_SET_CURRENTROUTE } from '../store/mutation-types'

// //////////////////////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////// COMPONENT DEFINITION ///////////////////////////////////////
// //////////////////////////////////////////////////////////////////////////////////////////////

const componentName = 'shell'

const componentData = function() {
  return {
    isLoading: this.$store.state.shell.isLoading,
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
  ...mapMutations([SHELL_SET_CURRENTROUTE])
}

// //////////////////////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////// METHODS ////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////////////////////////////////

// navigate (direction: Number): Void
function navigate(direction) {
  this[SHELL_SET_CURRENTROUTE](direction)
  this.$router.push({ name: this.currentRoute.name })
}

// //////////////////////////////////////////////////////////////////////////////////////////////
// //////////////////////////////////// GETTERS & SETTERS ///////////////////////////////////////
// //////////////////////////////////////////////////////////////////////////////////////////////

function getCurrentRoute() {
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
.backdrop {
  z-index: 10;
  position: fixed;
  width: 100%;
  height: 620px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding-top: 250px;
}

.shellContainer {
  margin: -1px -15px -1px -16px;
}

.sk-folding-cube {
  margin: 20px auto;
  width: 100px;
  height: 100px;
  position: relative;
  transform: rotateZ(45deg);
}

.sk-folding-cube .sk-cube {
  float: left;
  width: 50%;
  height: 50%;
  position: relative;
  -ms-transform: scale(1.1);
  transform: scale(1.1);
}

.sk-folding-cube .sk-cube:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #FFF;
  animation: sk-foldCubeAngle 2.4s infinite linear both;
  -ms-transform-origin: 100% 100%;
  transform-origin: 100% 100%;
}

.sk-folding-cube .sk-cube2 {
  transform: scale(1.1) rotateZ(90deg);
}

.sk-folding-cube .sk-cube3 {
  transform: scale(1.1) rotateZ(180deg);
}

.sk-folding-cube .sk-cube4 {
  transform: scale(1.1) rotateZ(270deg);
}

.sk-folding-cube .sk-cube2:before {
  animation-delay: 0.3s;
}

.sk-folding-cube .sk-cube3:before {
  animation-delay: 0.6s;
}

.sk-folding-cube .sk-cube4:before {
  animation-delay: 0.9s;
}

@keyframes sk-foldCubeAngle {
  0%,
  10% {
    transform: perspective(140px) rotateX(-180deg);
    opacity: 0;
  }
  25%,
  75% {
    transform: perspective(140px) rotateX(0deg);
    opacity: 1;
  }
  90%,
  100% {
    transform: perspective(140px) rotateY(180deg);
    opacity: 0;
  }
}
</style>

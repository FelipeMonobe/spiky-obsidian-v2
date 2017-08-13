import Vue from 'vue'
import Router from 'vue-router'

import Shell from '@/components/Shell'
import Reader from '@/components/Reader'
import Processor from '@/components/Processor'

Vue.use(Router)

const routeFactory = (name, path, component, children, redirect) =>
  ({ name, path, component, children, redirect })

const defaultRoute = routeFactory(null, '*', null, null, '/execution/')
const readerRoute = routeFactory('execution.reader', '', Reader)
const processorRoute = routeFactory('execution.processor', 'processor', Processor)
const shellRoute = routeFactory(null, '/execution', Shell, [processorRoute, readerRoute])

const routes = [shellRoute, defaultRoute]

export default new Router({ routes })

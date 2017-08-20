import { parseString } from 'xml2js'
import { allSettled, denodeify } from 'q'
import { partition, times, pipe, map, reduce, uniq } from 'ramda'

import { getValueFromPropertyPath, getLastNodes } from '@/utils/object'
import { filterByObjectPropertyName, groupByFirstProperty } from '@/utils/array'

const _parseString = denodeify(parseString)

const extractXmls = async (rawXmls) => {
  const xmls = await parseToXml(rawXmls)
  const xmlsGroupedByModel = groupByFirstProperty(xmls)
  const xmlModelKeys = Object.keys(xmlsGroupedByModel)
  const xmlModels = xmlModelKeys.map(x => ({
    text: `${x} (${xmlsGroupedByModel[x].length})`,
    value: x
  }))

  return { xmls, xmlModels }
}

const normalizeXmls = (pluckedXmls) => {
  const [multiple, single] = partition(x => Object.keys(x)
    .map(y => x[y])
    .some(y => Array.isArray(y)),
    pluckedXmls)

  const replicated = multiple
    .map(x => {
      const [arrayProps, otherProps] = partition(y => Array.isArray(x[y]), Object.keys(x))
      const sample = arrayProps[0]
      const result = []
      let qty = x[sample].length

      times(n => {
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

  return replicated
    .reduce((acc, curr) => acc.concat(curr), [])
    .concat(single)
}

const parseToXml = async (rawXmls) => {
  const _parserOptions = { explicitArray: false, trim: true }
  const xmls = await allSettled(rawXmls.map(x => _parseString(x, _parserOptions)))
  const successfulXmls = xmls.filter(x => x.state === 'fulfilled')
  const xmlsValues = successfulXmls.map(x => x.value)
  return xmlsValues
}

const pluckXmls = (xmls, options) => {
  return xmls
    .map(x => {
      const body = {}

      options
        .forEach(y => getValueFromPropertyPath(y, x, body))

      return body
    })
}

const previewXmlModel = (model, xmls) => {
  const getXmlsByModel = filterByObjectPropertyName(model)
  const xmlsByModel = getXmlsByModel(xmls)

  const uniqueXmlSamplesProps = pipe(
    map(x => x[model]),
    map(x => getLastNodes(x, model)),
    reduce((x, y) => x.concat(y), []),
    uniq
  )(xmlsByModel)

  return { uniqueXmlSamplesProps, xmlsByModel }
}

export {
  extractXmls,
  normalizeXmls,
  parseToXml,
  pluckXmls,
  previewXmlModel
}

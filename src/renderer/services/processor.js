import { parseString } from 'xml2js'
import { allSettled, denodeify } from 'q'

import UtilObject from '../utils/object'

const _parseString = denodeify(parseString)

const parseToXml = async (rawXmls) => {
  const _parserOptions = { explicitArray: false, trim: true }
  const xmls = await allSettled(rawXmls.map(x => _parseString(x, _parserOptions)))
  const successfulXmls = xmls.filter(x => x.state === 'fulfilled')
  const xmlsValues = successfulXmls.map(x => x.value)
  return xmlsValues
}

const pluckXmls = (xmls, options) => {
  const optionsValues = options
    .map(x => x.value)

  const unormalizedXmls = xmls
    .map(x => {
      const body = {}

      optionsValues
        .forEach(y => UtilObject.getValueFromPropertyPath(y, x, body))

      return body
    })

  return unormalizedXmls
}

// const updateXmls = (id, xmls) => {
//   const database = UtilDb.getDbInstance()
//   const query = { plucked: xmls }

//   return database
//     .table('xmls')
//     .update(id, query)
// }

export default {
  parseToXml,
  pluckXmls
  // updateXmls
}

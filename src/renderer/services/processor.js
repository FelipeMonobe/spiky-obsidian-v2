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
  return xmls
    .map(x => {
      const body = {}

      options
        .forEach(y => UtilObject.getValueFromPropertyPath(y, x, body))

      return body
    })
}

export default {
  parseToXml,
  pluckXmls
}

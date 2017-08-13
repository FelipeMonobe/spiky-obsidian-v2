const R = require('ramda')

const groupByFirstProperty = R.groupBy(x => R.head(R.keys(x)))
const getListedValuesFromObjects = (propertiesList, objectList) => objectList
  .map(x => propertiesList
    .reduce((a, c) => {
      a.push(x[c])
      return a
    }, []))
const filterByObjectPropertyName = (property) => {
  return R.filter(x => {
    return x.hasOwnProperty(property)
  })
}

module.exports = {
  filterByObjectPropertyName,
  getListedValuesFromObjects,
  groupByFirstProperty
}

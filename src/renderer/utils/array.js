import { groupBy, head, keys, filter } from 'ramda'

const groupByFirstProperty = groupBy(x => head(keys(x)))

const getListedValuesFromObjects = (propertiesList, objectList) => objectList
  .map(x => propertiesList
    .reduce((a, c) => {
      a.push(x[c])
      return a
    }, []))

const filterByObjectPropertyName = (property) => {
  return filter(x => {
    return x.hasOwnProperty(property)
  })
}

export {
  filterByObjectPropertyName,
  getListedValuesFromObjects,
  groupByFirstProperty
}

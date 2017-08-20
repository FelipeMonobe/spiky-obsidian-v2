import { build } from 'node-xlsx'
import { remote } from 'electron'
import { denodeify, defer } from 'q'
import { writeFile } from 'graceful-fs'
import { head, keys, pipe, prepend } from 'ramda'
import { getListedValuesFromObjects } from '@/utils/array'

const _writeFile = denodeify(writeFile)

const _showSaveDialog = filters => {
  const deferred = defer()

  remote.dialog.showSaveDialog(filters, path => deferred.resolve(path))
  return deferred.promise
}

const _buildXlsx = (name, body) => {
  const header = pipe(head, keys)(body)
  let data = getListedValuesFromObjects(header, body)

  data = prepend(header, data)
  return build([{ name, data }])
}

const _exportToXlsx = async (path, body) => {
  const filename = path.split('/').pop()
  const xlsxBuffer = _buildXlsx(filename, body)

  await _saveXlsx(path, xlsxBuffer)
}

const openDirectoryDialog = async (body) => {
  const filters = [{
    name: 'Microsoft Excel Open XML Format Spreadsheet',
    extensions: ['xlsx']
  }]
  const path = await _showSaveDialog({ filters })

  _exportToXlsx(path, body)
}

const _saveXlsx = (path, xlsxBuffer) => {
  return _writeFile(path, xlsxBuffer)
}

export {
  openDirectoryDialog
}

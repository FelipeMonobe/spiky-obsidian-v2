import glob from 'glob'
import { readFile } from 'graceful-fs'
import { all, denodeify } from 'q'

const _readFile = denodeify(readFile)
const _glob = denodeify(glob)
const nocase = true

async function readXmlFrom(selectedPath, selectedGlob) {
  const cwd = selectedPath.trim()
  const xmlPaths = await _getXmlPaths(cwd, selectedGlob)
  const xmlContent = await _readXmlContent(cwd, xmlPaths)

  return xmlContent
}

function _getXmlPaths(cwd, selectedGlob) {
  return _glob(selectedGlob, { cwd, nocase })
}

function _readXmlContent(cwd, xmlPaths) {
  return all(xmlPaths
    .map(xmlPath => _readFile(`${cwd}/${xmlPath}`, 'utf-8')))
}

export {
  readXmlFrom
}

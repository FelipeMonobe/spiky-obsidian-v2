import glob from 'glob'
import { readFile } from 'graceful-fs'
import { all, denodeify } from 'q'
import DbUtil from '../utils/db'

const _readFile = denodeify(readFile)
const _glob = denodeify(glob)
const nocase = true

// //////////////////////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////// PUBLIC FUNCTIONS ///////////////////////////////////////
// //////////////////////////////////////////////////////////////////////////////////////////////

// insertXmlEntries (xmls: Array<Object>): Promise<Void>
async function insertXmlEntries (xmls) {
  const date = new Date()
  const entries = xmls.map(raw => ({ date, raw }))
  const db = DbUtil.getDbInstance()

  return db.xmls.put(entries)
}
// readXmlFrom (selectedPath: String, selectedGlob: String): Array<String>
async function readXmlFrom (selectedPath, selectedGlob) {
  const cwd = selectedPath
    .trim()
    .replace(/\s/, '\\ ')
  const xmlPaths = await _getXmlPaths(cwd, selectedGlob)
  const xmlContent = await _readXmlContent(cwd, xmlPaths)

  return xmlContent
}

// //////////////////////////////////////////////////////////////////////////////////////////////
// //////////////////////////////////// PRIVATE FUCTIONS ////////////////////////////////////////
// //////////////////////////////////////////////////////////////////////////////////////////////

// _getXmlPaths (cwd: String, selectedGlob: String): Void
function _getXmlPaths (cwd, selectedGlob) {
  _glob(selectedGlob, { cwd, nocase })
}
// _readXmlContent (cwd: String, xmlPaths: Array<String>): Array<String>
function _readXmlContent (cwd, xmlPaths) {
  all(xmlPaths
  .map(xmlPath => _readFile(`${cwd}/${xmlPath}`, 'utf-8')))
}

export default {
  insertXmlEntries,
  readXmlFrom
}

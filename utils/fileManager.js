const fs = require('fs')
const path = require('path')
const filePath = path.join(__dirname, '../data/repertoire.json')

const readRepertoire = () => {
  const data = fs.readFileSync(filePath, 'utf8')
  return JSON.parse(data)
}

const writeRepertoire = (data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8')
}

module.exports = { readRepertoire, writeRepertoire }


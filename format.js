const fs = require('fs').promises
const { join } = require('path')

const formatFile = file => fs.readFile(file, 'utf-8').then(json => fs.writeFile(file, JSON.stringify(JSON.parse(json), null, 2)))
const format = path => fs.readdir(path).then(files => Promise.all(files.map(it => {
  const file = join(path, it)
  return fs.stat(file).then(stat => stat.isDirectory() ? format(file) : formatFile(file))
})))

format('src/data').then(() => formatFile('src/pack.mcmeta')).then(() => console.log('Success!')).catch(console.error)

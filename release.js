const { existsSync, rmSync, promises: fs } = require('fs')
const { join } = require('path')

const formatFile = file => fs.readFile(file, 'utf-8').then(json => fs.writeFile(file.replace('src', 'release'), JSON.stringify(JSON.parse(json))))
const format = path => fs.mkdir(path.replace('src', 'release')).then(() => fs.readdir(path)).then(files => Promise.all(files.map(it => {
  const file = join(path, it)
  return fs.stat(file).then(stat => stat.isDirectory() ? format(file) : formatFile(file))
})))

if (existsSync('release') && rmSync) rmSync('release', { recursive: true })
fs.mkdir('release').then(() => format('src/data')).then(() => formatFile('src/pack.mcmeta')).then(() => console.log('Success!'), console.error)

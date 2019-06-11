const fs = require('fs')
const checker = require('license-checker')

fs.readFile('./package.json', 'utf8', (err, jsonString) => {
  if (err) {
    console.log('File read failed:', err)
    return
  }
  const packagesJSON = JSON.parse(jsonString)
  const dep = Object.entries(packagesJSON.dependencies).reduce(
    (deps, dep) => `${deps}${dep[0]}@${dep[1]};`,
    ''
  )
  const devDep = Object.entries(packagesJSON.devDependencies).reduce(
    (deps, dep) => `${deps}${dep[0]}@${dep[1]};`,
    ''
  )
  checker.init(
    {
      start: './',
      out: './license.json',
      packages: dep + devDep
    },
    function(err, packages) {
      if (err) {
        console.log('Error checking file', err)
      } else {
        const filtered = Object.entries(packages).reduce(
          (pcks, [name, data]) => {
            return {
              ...pcks,
              [name]: {
                licenses: data.licenses,
                repository: data.repository
              }
            }
          },
          {}
        )
        fs.writeFile('./licenses.json', JSON.stringify(filtered), () => {
          console.log('COMPLETED')
        })
      }
    }
  )
})

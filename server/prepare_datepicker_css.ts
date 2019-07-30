import * as fs from 'fs'

export default () => {
  return new Promise<string>((resolve, reject) => {
    fs.readFile(
      './node_modules/react-dates/lib/css/_datepicker.css',
      'utf8',
      (error, data) => {
        if (error) return reject(error)

        resolve(
          data
            .replace(/#b2f1ec/g, '#d8e7fd')
            .replace(/#80e8e0/g, '#b7d2fb')
            .replace(/#66e2da/g, '#8ebaf8')
            .replace(/#33dacd/g, '#2e7ef2')
            .replace(/#00a699/g, '#2e7ef2')
            .replace(/#008489/g, '#1f56a7')
            .replace(/#007a87/g, '#194584')
            .replace(/#f2f2f2/g, '#f7fafe')
            .replace(/#e4e7e7/g, '#eff5fe')
            .replace(/#dbdbdb/g, '#d8e7fd')
            .replace(/#cacccd/g, '#b7d2fb')
            .replace(/#82888a/g, '#8ebaf8')
            .replace(/#757575/g, '#609df6')
            .replace(/#484848/g, '#2e7ef2')
            .replace('font-size: 19px;', 'font-size: 14px;')
        )
      }
    )
  })
}

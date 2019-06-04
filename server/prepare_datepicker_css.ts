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
            .replace('#b2f1ec', '#CEFBF9')
            .replace('#80e8e0', '#9DF6F2')
            .replace('#66e2da', '#6BF2EC')
            .replace('#33dacd', '#08E8DE')
            .replace('#00a699', '#07D0C7')
            .replace('#008489', '#048B85')
            .replace('#007a87', '#035C58')
            .replace('#f2f2f2', '#F6F7F7')
            .replace('#e4e7e7', '#EDEFF0')
            .replace('#dbdbdb', '#D1D5D7')
            .replace('#cacccd', '#A3AAAF')
            .replace('#82888a', '#747F86')
            .replace('#757575', '#46545E')
            .replace('#484848', '#22333F')
            .replace('font-size: 19px;', 'font-size: 14px;')
        )
      }
    )
  })
}

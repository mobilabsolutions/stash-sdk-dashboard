import * as fs from 'fs'
import { theme } from '../assets/style'

export default () => {
  return new Promise<string>((resolve, reject) => {
    fs.readFile(
      './node_modules/react-dates/lib/css/_datepicker.css',
      'utf8',
      (error, data) => {
        if (error) return reject(error)

        resolve(
          data
            .replace(/#b2f1ec/g, theme.primary.A100)
            .replace(/#80e8e0/g, theme.primary.A200)
            .replace(/#66e2da/g, theme.primary.A300)
            .replace(/#33dacd/g, theme.primary.A500)
            .replace(/#00a699/g, theme.primary.A500)
            .replace(/#008489/g, theme.primary.A700)
            .replace(/#007a87/g, theme.primary.A800)
            .replace(/#f2f2f2/g, theme.shade.A25)
            .replace(/#e4e7e7/g, theme.shade.A50)
            .replace(/#dbdbdb/g, theme.shade.A100)
            .replace(/#cacccd/g, theme.shade.A200)
            .replace(/#82888a/g, theme.shade.A300)
            .replace(/#757575/g, theme.shade.A400)
            .replace(/#484848/g, theme.shade.A500)
            .replace('font-size: 19px;', 'font-size: 14px;')
        )
      }
    )
  })
}

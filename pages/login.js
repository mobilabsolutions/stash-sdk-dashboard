import { useLocalization } from '../hooks'

export default () => {
  const { getText } = useLocalization()

  return (
    <div>
      <span>{getText('Login')}</span>
    </div>
  )
}

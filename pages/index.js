import { Localization } from '../components/translations'

export default () => {
  return (
    <Localization>
      {({ getText }) => (
        <div>
          <span>{getText('Welcome')}</span>
        </div>
      )}
    </Localization>
  )
}

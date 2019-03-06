import { AccountIcon, KeyIcon } from '../components/atoms'
import { IconInput } from '../components/molecules'

export default () => {
  return (
    <div>
      <IconInput
        id="test"
        name="test"
        value="dsf"
        onChanged={value => console.log(value)}
        icon={<AccountIcon />}
      />
      <IconInput
        id="test"
        name="test"
        value="dsf"
        onChanged={value => console.log(value)}
        icon={<KeyIcon />}
      />
    </div>
  )
}

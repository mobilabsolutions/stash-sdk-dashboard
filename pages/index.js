import { useLocalization, useTransactions } from '../hooks'

export default () => {
  const { getText } = useLocalization()
  const { data } = useTransactions()

  return (
    <div>
      <span>{getText('Welcome')}</span>
      <div>
        {data &&
          data.map((row, index) => (
            <span key={index}>{JSON.stringify(row)}</span>
          ))}
      </div>
    </div>
  )
}

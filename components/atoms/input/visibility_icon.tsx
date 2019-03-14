import styled from '../../styled'
import { VisibilityIcon, InvisibilityIcon } from '../index'

const Wrapper = styled.div`
  display: flex;
  margin-right: 12px;
  align-self: center;
  align-items: center;
  cursor: pointer;
`

export default function InputVisibilityIcon({ visible, setVisible }) {
  return (
    <Wrapper>
      {visible ? (
        <InvisibilityIcon onClick={() => setVisible(false)} />
      ) : (
        <VisibilityIcon onClick={() => setVisible(true)} />
      )}
    </Wrapper>
  )
}

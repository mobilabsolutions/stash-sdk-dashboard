import styled from '../../styled'

const Button = styled.button`
  border-radius: 4px;
  border-width: 0;
  outline: none;
  overflow: hidden;
  padding: 0;
  position: relative;
  transition: background-color 0.3s;
  :hover,
  :focus {
    cursor: pointer;
  }
  :active:not(:disabled)::before {
    padding-top: 120%;
    transition: width 0.4s ease-out, padding-top 0.4s ease-out;
    width: 120%;
  }
  :disabled {
    cursor: not-allowed;
  }

  background-color: #ffffff;
  :hover,
  :focus {
    background-color: ${props => props.theme.shade.A50};
  }
  :active {
    background-color: ${props => props.theme.shade.A50};
  }
  :disabled {
    background-color: ${props => props.theme.shade.A300};
  }
  > span {
    color: ${props => props.theme.shade.A600};
  }
`
export default function FlatnButton({ children, ...rest }) {
  return <Button {...rest}>{children}</Button>
}

import { UpIcon, DownIcon } from '../../atoms'
import styled from '../../styled'

const MAX_PAGES = 5
const MIDDLE_OFFSET = Math.floor(MAX_PAGES / 2)

const Wrapper = styled.div`
  user-select: none;
  ul {
    list-style: none;
    display: flex;
    align-items: center;
    position: absolute;
    bottom: -50px;
    left: -32px;
    z-index: 10;
    height: 52px;
    margin: 0px;
  }
  ul > li {
    width: 36px;
    height: 36px;
    border-radius: 5px;
    margin-left: 4px;
    margin-right: 4px;
    line-height: 36px;
    font-family: ${props => props.theme.fontHeadline};
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    color: ${props => props.theme.shade.A100};
    cursor: pointer;
  }
  ul > li.number:hover,
  ul > li.selectedPage,
  ul > li.arrow:hover {
    color: ${props => props.theme.shade.A500};
    background-color: ${props => props.theme.shade.A50};
    fill: ${props => props.theme.shade.A500};
  }
  ul > li.number:hover,
  ul > li.arrow:hover {
    background-color: ${props => props.theme.shade.A100};
  }
  ul > li.arrow:hover {
  }
  li.arrow {
    transform: rotate(90deg);
    fill: ${props => props.theme.shade.A100};
  }
  li.arrowHidden {
    visibility: hidden;
  }
  li.noArrow {
    display: none;
  }
`

export default ({ selectedPage, numberOfPages, onSelectPage }) => {
  if (numberOfPages <= 1) return null

  const pageNumbers = Array.from(
    { length: Math.min(numberOfPages, MAX_PAGES) },
    (_, index) =>
      index +
      (selectedPage <= MIDDLE_OFFSET
        ? 1
        : selectedPage + MIDDLE_OFFSET >= numberOfPages
        ? numberOfPages - Math.min(numberOfPages, MAX_PAGES) + 1
        : selectedPage - MIDDLE_OFFSET)
  )

  const classNameDown =
    numberOfPages < MAX_PAGES
      ? 'noArrow'
      : selectedPage === 1
      ? 'arrowHidden'
      : 'arrow'

  const classNameUp =
    numberOfPages < MAX_PAGES
      ? 'noArrow'
      : selectedPage === numberOfPages
      ? 'arrowHidden'
      : 'arrow'

  return (
    <Wrapper>
      <ul>
        <li
          className={classNameDown}
          onClick={() => onSelectPage(selectedPage - 1)}
        >
          <DownIcon />
        </li>
        {pageNumbers.map(number => (
          <li
            className={selectedPage === number ? 'selectedPage' : 'number'}
            key={number}
            onClick={() => {
              onSelectPage(number)
            }}
          >
            {number}
          </li>
        ))}
        <li
          className={classNameUp}
          onClick={() => onSelectPage(selectedPage + 1)}
        >
          <UpIcon />
        </li>
      </ul>
    </Wrapper>
  )
}

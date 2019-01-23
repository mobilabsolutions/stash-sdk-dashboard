import styled from 'styled-components'

import { UpIcon, DownIcon } from '../../atoms'

const MAX_PAGES = 5
const MIDDLE_OFFSET = Math.floor(MAX_PAGES / 2)

const Wrapper = styled.div`
  user-select: none;
  ul {
    list-style: none;
    display: flex;
    align-items: center;
  }
  ul > li {
    width: 40px;
    height: 40px;
    border-radius: 5px;
    margin-left: 4px;
    margin-right: 4px;
    line-height: 40px;
    font-family: ${props => props.theme.font};
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    color: ${props => props.theme.shade.A200};
    cursor: pointer;
    align-items: center;
  }
  ul > li.number:hover,
  ul > li.selectedPage,
  ul > li.arrow:hover {
    color: ${props => props.theme.white};
    background-color: ${props => props.theme.shade.A100};
    fill: ${props => props.theme.white};
  }
  ul > li.number:hover,
  ul > li.arrow:hover {
    background-color: ${props => props.theme.shade.A200};
  }
  ul > li.arrow:hover {
  }
  li.arrow {
    transform: rotate(90deg);
    fill: ${props => props.theme.shade.A200};
  }
  li.arrowHidden {
    visibility: hidden;
  }
  li.noArrow {
    display: none;
  }
`

export default ({ selectedPage, numberOfPages, onPageNumberClicked }) => {
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
          onClick={() => onPageNumberClicked(selectedPage - 1)}
        >
          <DownIcon />
        </li>
        {pageNumbers.map(number => (
          <li
            className={selectedPage === number ? 'selectedPage' : 'number'}
            key={number}
            onClick={() => {
              onPageNumberClicked(number)
            }}
          >
            {number}
          </li>
        ))}
        <li
          className={classNameUp}
          onClick={() => onPageNumberClicked(selectedPage + 1)}
        >
          <UpIcon />
        </li>
      </ul>{' '}
    </Wrapper>
  )
}

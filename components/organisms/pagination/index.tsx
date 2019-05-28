import React from 'react'
import { Pagination } from '@zendeskgarden/react-pagination'
import styled from '../../styled'

const transformPageProps = (pageType, props) => {
  props['data-test-id'] = pageType
  return props
}

const Label = styled.label`
  padding-right: 10px;
  font-size: 14px;
  text-transform: capitalize;
  color: ${props => props.theme.shade.A200};
`
const Select = styled.select`
  width: 60px;
  height: 32px;
  border-radius: 4px;
  border: solid 1px #ededed;
`

const PageSizeOptions = ({
  pageSize,
  pageSizeOptions,
  rowsSelectorText,
  onPageSizeChange
}) => (
  <span className="select-wrap -pageSizeOptions">
    <Label htmlFor="page-size">{rowsSelectorText}:</Label>
    <Select
      name="page-size"
      aria-label={rowsSelectorText}
      onChange={e => onPageSizeChange(Number(e.target.value))}
      value={pageSize}
    >
      {pageSizeOptions.map((option, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </Select>
  </span>
)

interface PropsType {
  PreviousComponent: any
  NextComponent: any
  renderPageJump: any
  renderCurrentPage: any
  pages: number
  page: 0
  renderPageSizeOptions: any
  showPageSizeOptions: boolean
  pageSizeOptions: Array<any>
  pageSize: number
  showPageJump: boolean
  style: any
  canPrevious: boolean
  canNext: boolean
  onPageSizeChange: Function
  onPageChange: Function
  pageJumpText: string
  previousText: string
  nextText: string
  className: string
  ofText: 'of'
  totalCount: 0
  rowsSelectorText: string
  rowsText: string
  pageText: string
  renderTotalPagesCount: any
}

const InfoContainer = styled.span`
  padding-left: 16px;
  font-size: 14px;
  color: ${props => props.theme.shade.A200};
`

const Container = styled.div`
  display: flex;
  border-top: solid 1px #ededed;
  padding-top: 16px;
`
const Item = styled.div`
  flex-direction: column;
  width: 33%;
`

export default (props: PropsType) => {
  const setPage = currentPage => {
    props.onPageChange(currentPage - 1)
  }
  const initial = props.page * props.pageSize + 1
  const final =
    initial + props.pageSize - 1 > props.totalCount
      ? props.totalCount
      : initial + props.pageSize - 1
  return (
    <Container>
      <Item>
        <InfoContainer>
          {initial}-{final} {props.ofText} {props.totalCount}
        </InfoContainer>
      </Item>
      <Item>
        <Pagination
          totalPages={props.pages}
          currentPage={props.page + 1}
          transformPageProps={transformPageProps}
          onChange={setPage}
        />
      </Item>
      <Item style={{ textAlign: 'right' }}>
        <PageSizeOptions
          pageSize={props.pageSize}
          pageSizeOptions={props.pageSizeOptions}
          rowsSelectorText={props.rowsSelectorText}
          onPageSizeChange={props.onPageSizeChange}
        />
      </Item>
    </Container>
  )
}

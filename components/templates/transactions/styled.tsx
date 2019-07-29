import styled from '../../styled'

type ListProps = {
  filterHeight: number
}

export const List = styled.ol<ListProps>`
  display: block;
  flex: 0 0 auto;
  flex-direction: column;
  margin: 0;
  padding: 0;
  overflow-y: auto;
  max-height: calc(100% - 4px - ${props => props.filterHeight || 0}px);
`

export const Item = styled.li`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  padding: 20px;
  :nth-child(even) {
    background-color: ${props => props.theme.shade.A25};
  }
  :hover {
    background-color: ${props => props.theme.primary.A25};
  }
`

export const ItemRow = styled.div`
  display: flex;
  flex-direction: row;
  margin: ${p => p.theme.spacing.xsmall};
  align-items: baseline;
  flex-wrap: wrap;
`

export const TransactionId = styled.p`
  color: ${props => props.theme.shade.A800};
  font-size: 1.2em;
  font-weight: bold;
  margin: 0px;
  flex: 1 1 25%;
`

export const Timestamp = styled.p`
  color: ${props => props.theme.shade.A700};
  font-size: 1em;
  text-overflow: ellipsis;
  overflow: hidden;
  margin: auto;
  flex: 0 0 18em;
`

export const Reason = styled.p`
  color: ${props => props.theme.shade.A500};
  font-size: 1em;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  line-height: 19px; /* fallback */
  max-height: 38px; /* fallback */
  -webkit-line-clamp: 2; /* number of lines to show */
  -webkit-box-orient: vertical;
  white-space: initial;
  margin: 0px;
`

export const CustomerId = styled.p`
  color: ${props => props.theme.shade.A700};
  font-size: 1em;
  text-overflow: ellipsis;
  overflow: hidden;
  margin: 0px;
  flex: 1 1 50%;
`

export const Amount = styled.p`
  color: ${props => props.theme.shade.A800};
  font-weight: bold;
  font-size: 16px;
  line-height: 1.38;
  font-variant-numeric: tabular-nums;
  margin: 0px;
  overflow: hidden;
  flex: 0 0 4em;
`

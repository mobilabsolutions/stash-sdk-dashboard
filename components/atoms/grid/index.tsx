import styled from '../../styled'

const sizeMapping = {
  1: '8.33%',
  2: '16.66%',
  3: '25%',
  4: '33.33%',
  5: '41.66%',
  6: '50%',
  7: '58.33%',
  8: '66.66%',
  9: '75%',
  10: '83.33%',
  11: '91.66%',
  12: '100%'
}

export const Row = styled.div`
  ::after {
    content: '';
    clear: both;
    display: table;
  }
`

export const Col = styled.div<{ l?: number; m?: number }>`
  width: 100%;
  float: left;
  padding: ${p => p.theme.spacing.small};
  @media only screen and (min-width: 600px) {
    width: ${({ m = 12 }) => sizeMapping[m]};
  }
  @media only screen and (min-width: 768px) {
    /* For desktop: */
    width: ${({ l = 12 }) => sizeMapping[l]};
  }
`

export default {
  Row,
  Col
}

import React from 'react'
import styled from '../../styled'
import { useLocalization } from '../../../hooks'
import { H1 } from '../../atoms'

const Pict = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="311"
    height="128"
    viewBox="0 0 311 128"
  >
    <g fill="none" fillRule="evenodd">
      <g opacity=".495" transform="translate(94.233 33.713)">
        <rect width="90.892" height="61.112" fill="#EDEFF0" rx="6.636" />
      </g>
      <path
        fill="#A3AAAF"
        d="M234.474 127.825H84.027c-7.007 0-12.688-5.686-12.688-12.7 0-7.014 5.68-12.7 12.688-12.7H13.335c-7.007 0-12.688-5.686-12.688-12.7 0-7.014 5.68-12.7 12.688-12.7H85.84c7.007 0 12.688-5.686 12.688-12.7 0-7.014-5.68-12.7-12.688-12.7H40.525c-7.008 0-12.689-5.686-12.689-12.7 0-7.014 5.681-12.7 12.689-12.7h72.504c-7.008 0-12.688-5.686-12.688-12.7 0-7.014 5.68-12.7 12.688-12.7h177.636c7.007 0 12.688 5.686 12.688 12.7 0 7.014-5.68 12.7-12.688 12.7H218.16c7.008 0 12.688 5.686 12.688 12.7 0 7.014-5.68 12.7-12.688 12.7h39.878c7.007 0 12.688 5.686 12.688 12.7 0 7.014-5.68 12.7-12.688 12.7h-18.442c-8.835 0-15.998 5.686-15.998 12.7 0 4.676 3.625 8.909 10.876 12.7 7.007 0 12.688 5.686 12.688 12.7 0 7.014-5.68 12.7-12.688 12.7zm65.864-63.5c-5.71 0-10.338-4.637-10.338-10.357s4.628-10.357 10.338-10.357c5.709 0 10.337 4.637 10.337 10.357s-4.628 10.357-10.337 10.357z"
        opacity=".123"
      />
      <rect
        width="90.892"
        height="61.112"
        x=".01"
        y=".169"
        fill="#D4D6E5"
        rx="6.636"
        transform="translate(94.922 40)"
      />
      <g transform="translate(109.514 49.023)">
        <rect width="90.892" height="61.112" fill="#F6A094" rx="6.636" />
        <rect
          width="32.109"
          height="3.478"
          x="8.989"
          y="45.93"
          fill="#ED4E39"
          opacity=".498"
          rx="1.738"
        />
        <rect
          width="76.408"
          height="9.006"
          x="7.191"
          y="32.421"
          fill="#ED4E39"
          opacity=".498"
          rx="4.5"
        />
        <rect
          width="6.292"
          height="3.478"
          x="44.946"
          y="45.93"
          fill="#ED4E39"
          opacity=".498"
          rx="1.738"
        />
        <rect
          width="6.292"
          height="3.478"
          x="53.935"
          y="45.93"
          fill="#ED4E39"
          opacity=".498"
          rx="1.738"
        />
      </g>
      <g>
        <path
          fill="#4F5995"
          d="M231.512 84.578l27.989 27.832a7.814 7.814 0 0 0 11.035-.016 7.766 7.766 0 0 0-.018-11.001l-32.36-32.145-6.663 6.663a6.117 6.117 0 0 0 .017 8.667z"
        />
        <path
          fill="#131E61"
          d="M242.53 73.621l-11.018 10.957-4.359-4.325c-.018-.017 10.989-11.02 10.989-11.02l4.389 4.389z"
        />
        <path
          fill="#4F5995"
          d="M192.747 65.937c-8.599-8.6-8.599-22.591 0-31.19 8.6-8.598 22.591-8.598 31.189 0 8.6 8.599 8.6 22.59 0 31.19-8.598 8.599-22.589 8.599-31.189 0zm49.947-1.502l-3.742-3.742c3.804-11.28 1.247-24.233-7.741-33.22-12.63-12.63-33.108-12.63-45.738 0-12.63 12.63-12.63 33.109 0 45.738 8.988 8.989 21.939 11.545 33.219 7.742l3.881 3.88 4.562-4.597c.018.017 11.023-10.987 11.023-10.987l-.117-.118 4.653-4.696z"
        />
      </g>
    </g>
  </svg>
)

const Container = styled.div`
  display: flex;
  height: 85%;
  .internal {
    margin: auto;
    display: flex;
    flex-direction: column;
  }
  svg {
    margin: auto;
    margin-bottom: ${p => p.theme.spacing.large};
  }
  h1 {
    color: ${p => p.theme.primary.A500};
    margin: auto;
    margin-bottom: ${p => p.theme.spacing.small};
  }
  span {
    color: ${p => p.theme.shade.A200};
    margin: auto;
    width: 274px;
    text-align: center;
  }
`

export default function NoTransactions() {
  const { getText } = useLocalization()
  return (
    <Container>
      <div className="internal">
        <Pict />
        <H1>{getText('No transaction to show.')}</H1>
        <span>
          {getText(
            'Sorry, we could not find any transaction matching your filtering choice.'
          )}
        </span>
      </div>
    </Container>
  )
}

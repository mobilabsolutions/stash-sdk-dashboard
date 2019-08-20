import React from 'react'
import styled from '../../styled'
import { useLocalization } from '../../../hooks'
import { PrimaryButton, FlatButton } from '../../atoms'

const Wrapper = styled.div`
  display: block;
  .header {
    display: block;
    height: 38px;
    .title {
      font-size: 16px;
      font-weight: bold;
      font-style: normal;
      font-stretch: normal;
      line-height: 2.44;
      letter-spacing: normal;
      color: #12202a;
    }
  }
  .report-list {
    display: flex;
    flex-direction: column;
    margin-top: 32px;
  }
`

const ReportItem = styled.div`
  width: 100%;
  border-radius: 4px;
  box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.06);
  background-color: #ffffff;
  padding: 8px 16px;
  margin-bottom: 8px;
  .report-title {
    margin: auto 0px;
    transform: translate(10px, 10px);
    position: absolute;
    font-size: 12px;
    font-weight: bold;
  }
  .report-action {
    float: right;
    display: flex;
    button {
      padding: 8px;
      font-weight: bold;
      display: flex;
      span {
        color: ${p => p.theme.shade.A200};
        margin: auto;
        margin-left: 8px;
        font-size: 12px;
      }
    }
  }
`

const ReportIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
  >
    <g fill="none" fillRule="evenodd">
      <circle cx="16" cy="16" r="16" fill="#B7D2FB" />
      <path
        fill="#2E7EF2"
        d="M21.672 12.719c.219.219.328.479.328.781v9.375c0 .313-.11.578-.328.797a1.085 1.085 0 0 1-.797.328h-9.75c-.313 0-.578-.11-.797-.328a1.085 1.085 0 0 1-.328-.797V9.125c0-.313.11-.578.328-.797.219-.219.484-.328.797-.328h5.406c.157 0 .308.031.453.094.021.01.037.02.047.031.021 0 .042.01.063.031.094.052.172.11.234.172l4.344 4.39zm-1.422.156l-3.125-3.156v3.156h3.125zm.625 10V14h-3.75c-.313 0-.578-.11-.797-.328a1.085 1.085 0 0 1-.328-.797v-3.75h-4.875v13.75h9.75z"
      />
    </g>
  </svg>
)

const DeleteIcon = (
  p: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    {...p}
  >
    <path
      fill="#A3AAAF"
      fillRule="nonzero"
      d="M16 2.922a.585.585 0 0 1-.196.437.649.649 0 0 1-.463.187h-.357v11.1c0 .344-.124.638-.374.882-.25.243-.546.365-.89.365H2.458c-.345 0-.642-.122-.891-.365a1.188 1.188 0 0 1-.374-.882v-11.1H.64a.619.619 0 0 1-.454-.187A.608.608 0 0 1 0 2.913c0-.172.062-.32.187-.445a.619.619 0 0 1 .454-.187h3.297V1.247c0-.344.121-.638.365-.882.243-.243.543-.365.9-.365h5.594c.345 0 .642.122.891.365.25.244.374.538.374.882v1.034h3.279a.64.64 0 0 1 .659.641zM5.185 1.265v1.016h5.612V1.265H5.185zm8.534 13.38v-11.1H2.46v11.1h11.26zM8.428 5.88c.13.119.196.267.196.445v5.951c0 .178-.063.33-.187.455a.608.608 0 0 1-.446.187.608.608 0 0 1-.445-.187.619.619 0 0 1-.187-.455v-5.95c0-.179.062-.33.187-.455a.608.608 0 0 1 .445-.187c.172 0 .318.065.437.196zm-3.457 0c.13.119.196.267.196.445v5.951c0 .178-.062.33-.187.455a.619.619 0 0 1-.454.187.619.619 0 0 1-.455-.187.619.619 0 0 1-.187-.455v-5.95c0-.179.063-.33.187-.455a.619.619 0 0 1 .455-.187c.178 0 .326.065.445.196zm6.895 0c.131.119.196.267.196.445v5.951c0 .178-.062.33-.187.455a.619.619 0 0 1-.454.187.619.619 0 0 1-.454-.187.619.619 0 0 1-.187-.455v-5.95c0-.179.062-.33.187-.455a.619.619 0 0 1 .454-.187c.178 0 .327.065.445.196z"
    />
  </svg>
)

const ExportIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
  >
    <path
      fill="#A3AAAF"
      fillRule="nonzero"
      d="M7.59 12.857l-2.786-2.786a.614.614 0 0 1 0-.866.571.571 0 0 1 .428-.187c.167 0 .316.06.447.178L7.41 10.93V.625c0-.179.06-.327.178-.446a.614.614 0 0 1 .866 0 .591.591 0 0 1 .188.446v10.304l1.732-1.715a.56.56 0 0 1 .429-.196.6.6 0 0 1 .437.187.6.6 0 0 1 .188.438.56.56 0 0 1-.197.428l-2.786 2.786a.584.584 0 0 1-.428.179.584.584 0 0 1-.429-.179zm8.231-2.375a.584.584 0 0 1 .179.429v3.982c0 .297-.107.556-.321.777-.215.22-.477.33-.786.33H1.107c-.31 0-.571-.107-.786-.321A1.069 1.069 0 0 1 0 14.893V10.91c0-.167.06-.313.179-.438a.58.58 0 0 1 .437-.187.58.58 0 0 1 .438.187c.119.125.178.271.178.438v3.482a.363.363 0 0 0 .375.375h12.786a.363.363 0 0 0 .375-.375V10.91c0-.167.06-.313.178-.438a.58.58 0 0 1 .438-.187c.173 0 .318.065.437.196z"
    />
  </svg>
)

export default function ReportManagment() {
  const { getText } = useLocalization()
  return (
    <Wrapper>
      <div className="header">
        <span className="title">{getText('Existent Reports')}</span>
        <PrimaryButton
          style={{ float: 'right' }}
          label={getText('Generate a new Report')}
        />
      </div>
      <div className="report-list">
        <ReportItem>
          <ReportIcon />
          <span className="report-title">Refunds on May 2019</span>
          <span className="report-action">
            <FlatButton>
              <ExportIcon /> <span>{getText('Download CSV')}</span>
            </FlatButton>
            <FlatButton>
              <DeleteIcon /> <span>{getText('Delete Report')}</span>
            </FlatButton>
          </span>
        </ReportItem>
        <ReportItem>
          <ReportIcon />
          <span className="report-title">Usage of Payment Methods</span>
          <span className="report-action">
            <FlatButton>
              <ExportIcon /> <span>{getText('Download CSV')}</span>
            </FlatButton>
            <FlatButton>
              <DeleteIcon /> <span>{getText('Delete Report')}</span>
            </FlatButton>
          </span>
        </ReportItem>
        <ReportItem>
          <ReportIcon />
          <span className="report-title">
            Chargebacks from 01.2019 to 04.2019
          </span>
          <span className="report-action">
            <FlatButton>
              <ExportIcon /> <span>{getText('Download CSV')}</span>
            </FlatButton>
            <FlatButton>
              <DeleteIcon /> <span>{getText('Delete Report')}</span>
            </FlatButton>
          </span>
        </ReportItem>
        <ReportItem>
          <ReportIcon />
          <span className="report-title">Usage of Payment Methods</span>
          <div className="report-action">
            <FlatButton>
              <ExportIcon /> <span>{getText('Download CSV')}</span>
            </FlatButton>
            <FlatButton>
              <DeleteIcon /> <span>{getText('Delete Report')}</span>
            </FlatButton>
          </div>
        </ReportItem>
      </div>
    </Wrapper>
  )
}

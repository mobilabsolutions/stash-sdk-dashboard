import React, { useState } from 'react'
import { ActionPopup } from '../../molecules'
import styled from '../../styled'
import { Report, Check } from '../../atoms'
import { useLocalization } from '../../../hooks'
import Theme from '../../../assets/style/theme'
import CustomReports from './custom_report'
import DefaultReport from './default_report'

interface Props {
  show: boolean
  downloadReport: (filterName: string, type?: string, parameters?: {}) => void
  onClose: (...args: any[]) => any
}

const ItemWrapper = styled.div<{ dashed?: boolean }>`
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  box-shadow: ${p => (p.dashed ? 'none' : '0 4px 16px 0 rgba(0, 0, 0, 0.06)')};
  background-color: #ffffff;
  width: 120px;
  height: 144px;
  margin-right: 16px;
  border: ${p => (p.dashed ? 'dashed 1px #979797' : 'none')};
  cursor: pointer;
  :hover {
    border: ${p =>
      p.dashed ? 'dashed 1px #979797' : `solid 1px ${p.theme.shade.A100}`};
    .check-mark {
      display: flex;
      justify-content: flex-end;
    }
  }
  .check-mark {
    display: none;
    position: absolute;
    width: 112px;
    margin-top: 8px;
  }

  .central-icon {
    margin: 32px auto 12px;
  }
  .title {
    margin: 0px 12px;
    color: ${p => p.theme.primary.A500};
    font-size: 12px;
    text-align: center;
  }
`

const ReporItem = Icon => ({
  title = '',
  dashed = false,
  onClick,
  checkMark = true
}) => (
  <ItemWrapper dashed={dashed} onClick={onClick}>
    <div className="check-mark">
      {checkMark && (
        <Check width={16} height={16} circleColor={Theme.shade.A100} />
      )}
    </div>
    <div className="central-icon">
      <Icon />
    </div>

    <span className="title">{title}</span>
  </ItemWrapper>
)

const Add = () => (
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
        fillRule="nonzero"
        d="M20 16.586h-3.348V20h-1.32v-3.414H12v-1.188h3.331V12h1.321v3.398H20z"
      />
    </g>
  </svg>
)

const DefaultReportEl = ReporItem(Report)
const CustomReport = ReporItem(Add)

const Wrapper = styled.div`
  display: flex;
  margin: 16px 32px 24px 40px;
`

export default function ReportCreation(props: Props) {
  const { show, onClose, downloadReport } = props
  const { getText } = useLocalization()
  const [showFilters, setShowFilters] = useState(false)
  const _onClose = () => {
    onClose()
    setShowFilters(false)
  }
  return (
    <ActionPopup
      show={show}
      onClose={_onClose}
      header={getText(
        showFilters
          ? 'Generate a new Report'
          : 'Select one of the default reports'
      )}
    >
      <Wrapper>
        {showFilters && (
          <CustomReports
            downloadReport={(filterName: string, parameters = {}) => {
              downloadReport(filterName, 'custom', parameters)
              _onClose()
            }}
          />
        )}
        {!showFilters && (
          <>
            <DefaultReport
              El={DefaultReportEl}
              onClick={_onClose}
              downloadReport={downloadReport}
            />
            <CustomReport
              title={getText('Set up your own report')}
              dashed
              checkMark={false}
              onClick={() => {
                setShowFilters(true)
              }}
            />
          </>
        )}
      </Wrapper>
    </ActionPopup>
  )
}

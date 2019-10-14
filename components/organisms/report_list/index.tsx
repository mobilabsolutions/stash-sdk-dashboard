import React from 'react'
import { FlatButton, Trash, Report, Export } from '../../atoms'
import { EmptyData } from '../../molecules'
import styled from '../../styled'
import { useLocalization } from '../../../hooks'
import { Report as ReportType } from '../../../types'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 32px;
`

const ReportItem = styled.div`
  width: 100%;
  border-radius: 4px;
  box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.06);
  background-color: #ffffff;
  padding: 8px 16px;
  margin-bottom: 8px;
  display: flex;
  .report-title {
    margin: auto 8px;
    font-size: 12px;
    text-overflow: ellipsis;
  }
  .report-action {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    button {
      padding: 8px;
      display: flex;
      transform: translate(0px, 2px);
      span {
        color: ${p => p.theme.shade.A200};
        margin: auto;
        margin-left: 8px;
        font-size: 12px;
      }
    }
  }
`
interface Props {
  reportList: ReportType[]
  errorLoading: boolean
  loading: boolean
  downloadReport: (filterName: string, type?: string) => void
  deleteReport: (n: string) => void
}

export default function ReportList(p: Props) {
  const { getText } = useLocalization()

  if (p.reportList.length === 0 && !p.loading) {
    return (
      <EmptyData
        title={getText('No reports created yet.')}
        secondTitle={getText('Please, generate a report first.')}
      />
    )
  }
  return (
    <Wrapper>
      {p.reportList.map((report, i) => (
        <ReportItem key={`${i}-${report.filterName}`}>
          <Report />
          <span className="report-title" title={report.filterName}>
            {report.filterName}
          </span>
          <span className="report-action">
            <FlatButton
              onClick={() => {
                p.downloadReport(report.filterName)
              }}
            >
              <Export /> <span>{getText('Download CSV')}</span>
            </FlatButton>
            <FlatButton
              onClick={() => {
                p.deleteReport(report.filterName)
              }}
            >
              <Trash /> <span>{getText('Delete')}</span>
            </FlatButton>
          </span>
        </ReportItem>
      ))}
    </Wrapper>
  )
}

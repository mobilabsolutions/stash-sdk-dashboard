import React, { useState, useEffect } from 'react'
import styled from '../../styled'
import {
  useLocalization,
  useReports,
  useDownloadcsv,
  useApi
} from '../../../hooks'
import { PrimaryButton } from '../../atoms'
import { ReportList, ReportCreation } from '../../organisms'

const Wrapper = styled.div`
  display: block;
  height: 100%;
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

const getStringParamsFromObject = (parameters = {}) =>
  Object.entries(parameters).reduce(
    (str, [name, value]) =>
      `${str}&${name}=${encodeURIComponent(value.toString())}`,
    ''
  )

export default function ReportManagment({ setisLoading }) {
  const { getText } = useLocalization()
  const { reportList, loading, errorLoading, deleteReport } = useReports()
  const { merchantId } = useApi()
  const exportCSV = useDownloadcsv()

  useEffect(() => {
    setisLoading(loading)
  }, [loading])

  const onDownload = (filterName: string, type = 'custom', parameters = {}) => {
    const paramString = getStringParamsFromObject(parameters)
    const fileKey = type === 'custom' ? 'filterName' : 'fileName'
    const URL = `/api/v1/report/${merchantId}/${type}?${fileKey}=${encodeURIComponent(
      filterName
    )}${paramString}`
    setisLoading(true)
    exportCSV.download(URL, filterName).finally(() => {
      setisLoading(false)
    })
  }
  const [show, setShow] = useState(false)
  return (
    <Wrapper>
      <div className="header">
        <span className="title">{getText('Existent Reports')}</span>
        <PrimaryButton
          style={{ float: 'right' }}
          label={getText('Generate a new Report')}
          onClick={() => setShow(true)}
        />
      </div>
      <ReportList
        reportList={reportList}
        loading={loading}
        downloadReport={onDownload}
        errorLoading={errorLoading}
        deleteReport={deleteReport}
      />
      <ReportCreation
        show={show}
        onClose={() => setShow(false)}
        downloadReport={onDownload}
      />
    </Wrapper>
  )
}

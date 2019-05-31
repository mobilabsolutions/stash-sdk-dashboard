import 'react-dates/initialize'

import { useState, forwardRef } from 'react'
import { DateRangePicker } from 'react-dates'
import moment from 'moment'

import { useLocalization } from '../../../hooks'
import { Select, InputSearch } from '../../molecules'
import styled from '../../styled'
import { statusToAction } from '../../../assets/utils'

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: 12px 48px;
  padding: 16px;
  flex: 1 1 auto;
  border-radius: 5px;
  box-shadow: 0 2px 4px 0 ${props => props.theme.shade.A50};
  background-color: #ffffff;
`

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  padding-right: 8px;
  flex-wrap: wrap;
`
const Label = styled.label`
  color: ${props => props.theme.shade.A800};
  font-family: ${props => props.theme.font};
  font-size: 1em;
  font-weight: bold;
  width: 10em;
`

export default forwardRef<HTMLDivElement, any>(
  ({ startDate, endDate, setRange, status, setStatus, text, setText }, ref) => {
    const { getText } = useLocalization()
    const statusOptions = Object.entries(statusToAction).map(act => ({
      value: act[0],
      label: getText(act[0])
    }))
    const [focusedInput, setFocusedInput] = useState(null)
    return (
      <Wrapper ref={ref}>
        <ItemWrapper>
          <DateRangePicker
            startDate={startDate}
            startDateId="filter_start_date_id"
            endDate={endDate}
            endDateId="filter_end_date_id"
            onDatesChange={({ startDate, endDate }) =>
              setRange(startDate, endDate)
            }
            focusedInput={focusedInput}
            onFocusChange={focusedInput => setFocusedInput(focusedInput)}
            noBorder
            isOutsideRange={value =>
              value.isAfter(
                moment()
                  .hours(23)
                  .minutes(59)
                  .seconds(59)
                  .milliseconds(999)
              )
            }
            initialVisibleMonth={() => moment().add(-1, 'months')}
            startDatePlaceholderText={getText('Start Date')}
            endDatePlaceholderText={getText('End Date')}
            hideKeyboardShortcutsPanel
          />
        </ItemWrapper>
        <ItemWrapper>
          <Select
            options={statusOptions}
            value={!!status ? { label: getText(status), value: status } : null}
            placeholder={getText('Status')}
            onChange={({ value }) => {
              setStatus(value)
            }}
          />
        </ItemWrapper>
        <ItemWrapper>
          <InputSearch
            field={{ onChange: setText, name: 'search-text' }}
            placeholder={getText('Search Payments…')}
          />
        </ItemWrapper>
      </Wrapper>
    )
  }
)

import React from 'react'
import { connect } from 'react-redux'
import { setChartTimeRange } from '../../actions/chartActions'
import { getChartData } from '../../actions/priceActions'
import { chartTimes } from '../../constants'

const mapDispatchToProps = (dispatch) => {
  return {
    setChartTimeRange: (chartTime, abbreviation) => {
      dispatch(setChartTimeRange(chartTime))
      dispatch(getChartData({ tokens: [abbreviation], timeRange: chartTime }))
    }
  }
}

const ChartTimeRange = ({ setChartTimeRange, abbreviation }) => {
  console.log(chartTimes)
  return (
    <div>
      {Object.values(chartTimes).map((singleChartTime) => {
        return <span
          key={singleChartTime.text}
          onClick={() => setChartTimeRange(singleChartTime, abbreviation)}>
          {singleChartTime.text}
        </span>
      })}
    </div>
  )
}

export default connect(null, mapDispatchToProps)(ChartTimeRange)

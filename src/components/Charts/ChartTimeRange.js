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
  return (
    <div>
      {Object.values(chartTimes).map((singleChartTime) => {
        return <button
          className='button is-small'
          key={singleChartTime.text}
          onClick={() => setChartTimeRange(singleChartTime, abbreviation)}>
          {singleChartTime.text}
        </button>
      })}
    </div>
  )
}

export default connect(null, mapDispatchToProps)(ChartTimeRange)

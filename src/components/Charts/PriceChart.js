import React from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import { LineChart, Line, Tooltip, XAxis, YAxis } from 'recharts'

const mapStateToProps = ({ price }) => {
  return {
    chartData: price.priceChartData.combinedChartData
  }
}

const PriceChart = ({ chartData }) => {
  return (
    <div>
      { chartData
      ? <LineChart data={chartData} width={800} height={500} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
        <XAxis dataKey='date' type='number' scale='time' domain={['dataMin', 'dataMax']} tickFormatter={tick => moment.unix(tick).calendar()} />
        <YAxis />
        <Tooltip />
        {
          ['BTC', 'LTC', 'ETH'].map((value) => {
            return <Line dot={false} type='monotone' key={value} dataKey={`${value}.close`} label={value} />
          })
        }
      </LineChart> : '' }
    </div>
  )
}

const PriceChartContainer = connect(mapStateToProps)(PriceChart)

export default PriceChartContainer

import React, { Component } from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import { LineChart, Line, Tooltip, XAxis, YAxis, ResponsiveContainer } from 'recharts'
import { getChartData } from '../../actions/priceActions'

import ChartTimeRange from './ChartTimeRange'

const mapStateToProps = ({ transactions, charts }) => {
  return {
    priceChartData: charts.priceChartData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getInitialData: (token) => {
      dispatch(getChartData({ tokens: [token] }))
    }
  }
}

class PriceChart extends Component {
  componentDidMount() {
    this.props.getInitialData(this.props.token)
  }

  render() {
    const { token, priceChartData } = this.props
    const chartData = priceChartData[token]

    return (
      <div>
      <ChartTimeRange abbreviation={token.toUpperCase()} />
      { chartData
        ?
            <LineChart data={chartData} width={800} height={500} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
            <XAxis dataKey='date' type='number' scale='time' domain={['dataMin', 'dataMax']} tickFormatter={tick => moment.unix(tick).format('MM/DD')} />
            <YAxis />
            <Tooltip />
            <Line dot={false} type='monotone' dataKey='close' />
            </LineChart>
           : '' }
        </div>
      )
  }
}

const PriceChartContainer = connect(mapStateToProps, mapDispatchToProps)(PriceChart)

export default PriceChartContainer

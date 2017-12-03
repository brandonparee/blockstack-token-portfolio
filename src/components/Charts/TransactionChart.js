import React, { Component } from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import { LineChart, Line, Tooltip, XAxis, YAxis, ResponsiveContainer } from 'recharts'
import { getChartData } from '../../actions/priceActions'

import ChartTimeRange from './ChartTimeRange'

const mapStateToProps = ({ transactions, charts }) => {
  return {
    transactionChartData: charts.transactionChartData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getInitialData: (token) => {
      dispatch(getChartData({ tokens: [token] }))
    }
  }
}

class TransactionChart extends Component {
  componentDidMount () {
    this.props.getInitialData(this.props.token)
  }

  render () {
    const { token, transactionChartData } = this.props
    const chartData = transactionChartData[token]

    return (
      <div>
        <ChartTimeRange abbreviation={token.toUpperCase()} />
        { chartData
        ? <LineChart data={chartData} width={800} height={500} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
          <XAxis dataKey='time' type='number' scale='time' domain={['dataMin', 'dataMax']} tickFormatter={tick => moment.unix(tick).calendar()} />
          <YAxis />
          <Tooltip />
          <Line dot={false} type='monotone' dataKey='currentAmount' />
        </LineChart> : '' }
      </div>
    )
  }
}

const TransactionChartContainer = connect(mapStateToProps, mapDispatchToProps)(TransactionChart)

export default TransactionChartContainer

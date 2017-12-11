import React, { Component } from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import { AreaChart, Area, Tooltip, XAxis, YAxis, ResponsiveContainer, Legend } from 'recharts'
import { getChartData } from '../../actions/priceActions'

import CustomTooltip from './CustomTooltip'
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
        <p>Editing and removing transactions coming soon.</p>
        <ChartTimeRange abbreviation={token.toUpperCase()} />
        { chartData
        ?
        <ResponsiveContainer width='100%' aspect={5}>
          <AreaChart data={chartData} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
            <Legend verticalAlign="top" height={36}/>
            <defs>
              <linearGradient id='colorAmount' x1='0' y1='0' x2='0' y2='1'>
                <stop offset='5%' stopColor='#ffb47b' stopOpacity={0.8} />
                <stop offset='95%' stopColor='#ffb47b' stopOpacity={0} />
              </linearGradient>
            </defs>

            <XAxis dataKey='time' type='number' scale='time' domain={['dataMin', 'dataMax']} tickFormatter={tick => moment.unix(tick).format('MM/DD')} />
            <YAxis dataKey='currentAmount' yAxisId={0} />
            <Tooltip content={<CustomTooltip />} />
            <Area dot={false} name='Fiat Value' type='monotone' dataKey='currentAmount' yAxisId={0} stroke='#ffb47b' fillOpacity={1} fill='url(#colorAmount)' />
          </AreaChart>
        </ResponsiveContainer> : '' }
      </div>
    )
  }
}

const TransactionChartContainer = connect(mapStateToProps, mapDispatchToProps)(TransactionChart)

export default TransactionChartContainer

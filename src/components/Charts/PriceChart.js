import React, { Component } from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import { AreaChart, Area, Tooltip, XAxis, YAxis, ResponsiveContainer, linearGradient, stop, defs } from 'recharts' // eslint-disable-line no-unused-vars
import { getChartData } from '../../actions/priceActions'

import ChartTimeRange from './ChartTimeRange'
import CustomTooltip from './CustomTooltip'

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
  componentDidMount () {
    this.props.getInitialData(this.props.token)
  }

  render () {
    const { token, priceChartData } = this.props
    const chartData = priceChartData[token]

    return (
      <div>
        <ChartTimeRange abbreviation={token.toUpperCase()} />
        { chartData
        ? <AreaChart data={chartData} width={800} height={500} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
          <XAxis dataKey='time' type='number' scale='time' domain={['dataMin', 'dataMax']} tickFormatter={tick => moment.unix(tick).format('MM/DD')} />
          <defs>
            <linearGradient id='colorClose' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='5%' stopColor='#ff7b5f' stopOpacity={0.8} />
              <stop offset='95%' stopColor='#ff7b5f' stopOpacity={0} />
            </linearGradient>
            <linearGradient id='colorVolume' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='5%' stopColor='#ffb47b' stopOpacity={1} />
              <stop offset='95%' stopColor='#ffb47b' stopOpacity={0.25} />
            </linearGradient>
          </defs>
          <YAxis dataKey='close' yAxisId={0} />
          <YAxis dataKey='volume' yAxisId={1} orientation='right' />
          <Tooltip content={<CustomTooltip />} />
          <Area dot={false} type='monotone' dataKey='close' stroke='#ff7b5f' yAxisId={0} fillOpacity={1} fill='url(#colorClose)' />
          <Area dot={false} type='monotone' dataKey='volume' stroke='#ffb47b' yAxisId={1} fillOpacity={1} fill='url(#colorVolume)' />
        </AreaChart>
           : '' }
      </div>
    )
  }
}

const PriceChartContainer = connect(mapStateToProps, mapDispatchToProps)(PriceChart)

export default PriceChartContainer

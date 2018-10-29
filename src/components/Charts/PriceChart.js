import React, { Component } from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import { AreaChart, Area, Tooltip, XAxis, YAxis, ResponsiveContainer, linearGradient, stop, defs, Legend } from 'recharts' // eslint-disable-line no-unused-vars
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
        ?
        <ResponsiveContainer width='100%' aspect={5}>
          <AreaChart data={chartData} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
            <Legend verticalAlign="top" height={36}/>
            <XAxis dataKey='time' type='number' scale='time' domain={['dataMin', 'dataMax']} tickFormatter={tick => moment.unix(tick).format('MM/DD')} />
            <defs>
              <linearGradient id='colorClose' x1='0' y1='0' x2='0' y2='1'>
                <stop offset='5%' stopColor='#ffb47b' stopOpacity={.8} />
                <stop offset='95%' stopColor='#ffb47b' stopOpacity={0.25} />
              </linearGradient>
              <linearGradient id='colorVolume' x1='0' y1='0' x2='0' y2='1'>
                <stop offset='5%' stopColor='#ff7b5f' stopOpacity={0.8} />
                <stop offset='95%' stopColor='#ff7b5f' stopOpacity={0} />
              </linearGradient>
            </defs>
            <YAxis dataKey='close' yAxisId={0} />
            <YAxis dataKey='volume' yAxisId={1} orientation='right' />
            <Tooltip content={<CustomTooltip />} />
            <Area dot={false} name='Price' type='monotone' dataKey='close' stroke='#ffb47b' yAxisId={0} fillOpacity={1} fill='url(#colorClose)' />
            <Area dot={false} name='Volume' type='monotone' dataKey='volume' stroke='#ff7b5f' yAxisId={1} fillOpacity={1} fill='url(#colorVolume)' />
          </AreaChart>
        </ResponsiveContainer>
           : '' }
      </div>
    )
  }
}

const PriceChartContainer = connect(mapStateToProps, mapDispatchToProps)(PriceChart)

export default PriceChartContainer

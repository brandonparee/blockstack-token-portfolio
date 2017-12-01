import React, { Component } from 'react'
import ReactTable from 'react-table'
import axios from 'axios'
import io from 'socket.io-client'

import LiveTradeDataTable from './LiveTradeDataTable'

const cryptoCompare = `https://min-api.cryptocompare.com/data`
const cryptoCompareWS = 'https://streamer.cryptocompare.com/'
// const socket = io(cryptoCompareWS)

class LiveTradeData extends Component {
  state = { data: [] }

  componentDidMount() {
    const fsym = this.props.token.toUpperCase()
    axios.get(`${cryptoCompare}/subs`, {
      params: {
        fsym,
        tsyms: 'USD'
      }
    })
    .then((res) => {
      const subscriptions = res.data.USD.TRADES
      // socket.emit('SubAdd', { subs: subscriptions })
      // socket.on('m', (data) => this.handleSocketData(data))
    })
    .catch((err) => {
      console.log(err)
    })

  }

  handleSocketData(data) {
    const currentTrade = data.split('~')
    let type
    console.log(currentTrade[4])
    if (currentTrade[4] === '1') {
      type = 'Buy'
    } else if (currentTrade[4] === '2') {
      type = 'Sell'
    }

    const tradeData = {
      type: type,
      exchange: currentTrade[1],
      quantity: currentTrade[7],
      price: currentTrade[8],
      total: currentTrade[9]
    }

    this.setState({ data: [tradeData] })
  }

  render() {
    const { token } = this.props

    return (
      <LiveTradeDataTable data={this.state.data} />
    )
  }
}

export default LiveTradeData

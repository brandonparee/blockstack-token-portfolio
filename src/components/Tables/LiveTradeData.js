import React, { Component } from 'react'
import ReactTable from 'react-table'
import axios from 'axios'
import io from 'socket.io-client'

import Fiat from '../Helpers/Fiat'

const cryptoCompare = `https://min-api.cryptocompare.com/data`
const cryptoCompareWS = 'https://streamer.cryptocompare.com/'

class LiveTradeData extends Component {
  state = { data: [], subscriptions: [] }
  socket = io(cryptoCompareWS)

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
      this.setState({ subscriptions })
      this.socket.emit('SubAdd', { subs: subscriptions })
      this.socket.on('m', (data) => this.handleSocketData(data))
    })
    .catch((err) => {
      console.log(err)
    })
  }

  componentWillUnmount() {
    this.socket.close()
  }

  handleSocketData(data) {
    const currentTrade = data.split('~')
    let type
    if (currentTrade[4] === '1') {
      type = 'Buy'
    } else if (currentTrade[4] === '2') {
      type = 'Sell'
    }

    if (currentTrade[4] !== '4' && currentTrade[1] !== 'LOADCOMPLETE') {
      const tradeData = {
        type: type,
        exchange: currentTrade[1],
        quantity: currentTrade[7],
        price: currentTrade[8],
        total: currentTrade[9]
      }
      const trades = this.state.data.slice(0,14)
      console.log(trades.length)
      this.setState({ data: [tradeData, ...trades] })
    }
  }

  render() {
    const { token } = this.props

    return (
      <ReactTable
        data={this.state.data}
        noDataText='Live Trade Data Table coming soon'
        columns={[
          {
            Header: 'Type',
            accessor: 'type'
          }, {
            Header: 'Exchange',
            accessor: 'exchange'
          }, {
            Header: 'Quanity',
            accessor: 'quantity'
          }, {
            Header: 'Price',
            accessor: 'price',
            Cell: (row) => <Fiat value={row.value} />
          }, {
            Header: 'Total',
            accessor: 'total',
            Cell: (row) => <Fiat value={row.value} />
          }
        ]}
        defaultPageSize={15}
      />
    )
  }
}

export default LiveTradeData

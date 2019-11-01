import React, { Component } from 'react'
import ReactTable from 'react-table'
import axios from 'axios'
import io from 'socket.io-client'

import Fiat from '../Helpers/Fiat'

const cryptoCompare = `https://min-api.cryptocompare.com/data`
const cryptoCompareWS = 'https://streamer.cryptocompare.com/'

class LiveTradeData extends Component {
  state = { data: [], subscriptions: [], enabled: false, isSetup: false }
  socket = io(cryptoCompareWS)

  setupLiveData() {
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

  toggleLiveData() {
    if (this.state.enabled) {
      this.socket.emit('SubRemove', { subs: this.state.subscriptions })
    } else {
      if (this.state.isSetup) {
        this.socket.emit('SubAdd', { subs: this.state.subscriptions })
      } else {
        this.setupLiveData()
      }
    }

    this.setState({ enabled: !this.state.enabled })
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
      this.setState({ data: [tradeData, ...trades] })
    }
  }

  render() {
    return (
      <div>
        <h1 className="subtitle">Live Trade Data</h1>
        <button type="button" className="button" onClick={this.toggleLiveData.bind(this)}>Toggle Live Data</button>
        <ReactTable
        data={this.state.data}
        noDataText='Click Toggle Live Data to enable Live Trade Data'
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
      </div>
    )
  }
}

export default LiveTradeData

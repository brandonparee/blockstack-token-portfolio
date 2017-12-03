import React from 'react'
import { connect } from 'react-redux'
import ReactTable from 'react-table'
import { Link } from 'react-router-dom'
import 'react-table/react-table.css'

import Fiat from '../Helpers/Fiat'
import PrettyPercent from '../Helpers/PrettyPercent'

const mapStateToProps = ({ marketData, preferences }) => {
  return {
    marketData: marketData.marketData,
    fiatPreference: preferences.fiat
  }
}

const floatSort = (a, b) => {
  a = parseFloat(a)
  b = parseFloat(b)
  return a > b ? 1 : -1
}

const TransactionTable = ({ marketData, fiatPreference }) => {
  return (
    <div>
      <ReactTable
        data={marketData}
        noDataText='Could not fetch Market Data'
        columns={[
          {
            Header: 'Name',
            accessor: 'name',
            Cell: (marketData) => <Link to={`/market-data/${marketData.original.symbol.toLowerCase()}`}>{marketData.original.name}</Link>
          }, {
            Header: `Market Cap (${fiatPreference})`,
            accessor: 'market_cap_usd',
            Cell: (row) => <Fiat value={row.value} />,
            sortMethod: floatSort
          }, {
            Header: `Price (${fiatPreference})`,
            accessor: 'price_usd',
            Cell: (row) => <Fiat value={row.value} />,
            sortMethod: floatSort
          }, {
            Header: `Volume (${fiatPreference})`,
            accessor: '24h_volume_usd',
            Cell: (row) => <Fiat value={row.value} />,
            sortMethod: floatSort
          }, {
            Header: 'Change (24h)',
            accessor: 'percent_change_24h',
            Cell: (row) => <PrettyPercent value={row.value} />,
            sortMethod: floatSort
          }, {
            Header: 'Change (1h)',
            accessor: 'percent_change_1h',
            Cell: (row) => <PrettyPercent value={row.value} />,
            sortMethod: floatSort
          }, {
            Header: 'Change (7d)',
            accessor: 'percent_change_7d',
            Cell: (row) => <PrettyPercent value={row.value} />,
            sortMethod: floatSort
          }
        ]}
        defaultPageSize={10}
      />
    </div>
  )
}

const TransactionTableContainer = connect(mapStateToProps)(TransactionTable)

export default TransactionTableContainer

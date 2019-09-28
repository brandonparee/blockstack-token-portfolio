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
        data={Object.values(marketData)}
        noDataText='Could not fetch Market Data'
        columns={[
          {
            Header: 'Rank',
            accessor: 'rank',
            sortMethod: floatSort
          },
          {
            Header: 'Name',
            accessor: 'name',
            Cell: (marketData) => <Link to={`/market-data/${marketData.original.symbol.toLowerCase()}`}>{marketData.original.name}</Link>
          }, {
            Header: `Market Cap (${fiatPreference})`,
            accessor: 'marketCapUsd',
            Cell: (row) => <Fiat value={row.value} />,
            sortMethod: floatSort
          }, {
            Header: `Price (${fiatPreference})`,
            accessor: 'priceUsd',
            Cell: (row) => <Fiat value={row.value} />,
            sortMethod: floatSort
          }, {
            Header: `Volume (${fiatPreference})`,
            accessor: 'volumeUsd24Hr',
            Cell: (row) => <Fiat value={row.value} />,
            sortMethod: floatSort
          }, {
            Header: 'Change (24h)',
            accessor: 'changePercent24Hr',
            Cell: (row) => <PrettyPercent value={row.value} />,
            sortMethod: floatSort
          }, 
          // {
          //   Header: 'Change (1h)',
          //   accessor: 'percent_change_1h',
          //   Cell: (row) => <PrettyPercent value={row.value} />,
          //   sortMethod: floatSort
          // }, {
          //   Header: 'Change (7d)',
          //   accessor: 'percent_change_7d',
          //   Cell: (row) => <PrettyPercent value={row.value} />,
          //   sortMethod: floatSort
          // }
        ]}
        defaultSorted={[{ id: 'rank' }]}
        defaultPageSize={100}
      />
    </div>
  )
}

const TransactionTableContainer = connect(mapStateToProps)(TransactionTable)

export default TransactionTableContainer

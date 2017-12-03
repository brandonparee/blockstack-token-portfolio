import React from 'react'
import { connect } from 'react-redux'
import ReactTable from 'react-table'
import moment from 'moment'
import { prettyCrypto, prettyFiat } from '../../utils'
import 'react-table/react-table.css'

const mapStateToProps = ({ portfolio }) => {
  return {
    portfolioHistory: portfolio.portfolioHistory
  }
}

const TransactionTable = ({ abbreviation, portfolioHistory }) => {
  const tokenHistory = portfolioHistory[abbreviation]

  return (
    <div>
      <ReactTable
        data={tokenHistory}
        defaultSorted={[
          {
            id: 'transactionDate',
            desc: true
          }
        ]}
        noDataText='No Transactions'
        columns={[
          {
            Header: 'Date',
            accessor: (tokenHistory) => moment(tokenHistory.date).format('YYYY-MM-DD'),
            id: 'transactionDate'
          }, {
            Header: 'Type',
            accessor: 'type'
          }, {
            Header: 'Pair',
            accessor: 'pair'
          }, {
            Header: 'Amount',
            accessor: (tokenHistory) => `${prettyCrypto(tokenHistory.amount)} ${abbreviation}`,
            id: 'toAmount'
          }, {
            Header: 'Total',
            accessor: (tokenHistory) => `${prettyFiat(tokenHistory.purchasePrice)} ${tokenHistory.pairedSymbol}`,
            id: 'fromAmout'
          }, {
            Header: 'Balance',
            accessor: (tokenHistory) => `${prettyCrypto(tokenHistory.totalAmount)} ${abbreviation}`,
            id: 'totalAmount'
          }
        ]}
        defaultPageSize={10}
      />
    </div>
  )
}

const TransactionTableContainer = connect(mapStateToProps)(TransactionTable)

export default TransactionTableContainer

import React from 'react'
import ReactTable from 'react-table'

const LiveTradeDataTable = ({ data }) => {
  return (
    <ReactTable
      data={data}
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
          accessor: 'price'
        }, {
          Header: 'Total',
          accessor: 'total'
        }
      ]}
      defaultPageSize={10}
    />
  )
}

export default LiveTradeDataTable

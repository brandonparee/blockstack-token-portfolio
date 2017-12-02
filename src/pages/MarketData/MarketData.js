import React from 'react'
import { connect } from 'react-redux'

import MarketDataTable from '../../components/Tables/MarketDataTable'

const MarketData = () => {
  return (
    <div>
      <h1 className='title'>Market Capitalization Data</h1>
      <MarketDataTable />
    </div>
  )
}

export default MarketData

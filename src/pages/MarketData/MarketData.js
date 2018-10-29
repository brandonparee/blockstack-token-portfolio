import React from 'react'

import Section from '../../components/Bulma/Section'
import MarketDataTable from '../../components/Tables/MarketDataTable'

const MarketData = () => {
  return (
    <Section>
      <div>
        <h1 className='title'>Market Capitalization Data</h1>
        <MarketDataTable />
      </div>
    </Section>
  )
}

export default MarketData

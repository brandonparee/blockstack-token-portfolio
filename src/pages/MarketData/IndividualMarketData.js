import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import Section from '../../components/Bulma/Section'
import Box from '../../components/Bulma/Box'
import Fiat from '../../components/Helpers/Fiat'
import PriceChart from '../../components/Charts/PriceChart'
import LiveTradeData from '../../components/Tables/LiveTradeData'

import './IndividualMarketData.css'

const mapStateToProps = ({ marketData, portfolio }, ownProps) => {
  const { abbreviation } = ownProps.match.params
  return {
    abbreviation,
    marketData: marketData.marketData,
    loading: portfolio.isFetching
  }
}

const IndividualMarketData = ({ abbreviation, marketData, loading }) => {
  abbreviation = _.upperCase(abbreviation)
  const singleMarketData = _.find(marketData, ['symbol', abbreviation])

  return (
    <div>
      { singleMarketData && !loading &&
        <Section title={`${singleMarketData.name} (${abbreviation})`}>
          <div className='IndividualMarketData'>
            <Box className='MarketData'>
              <p><strong>Price</strong> <Fiat value={singleMarketData['price_usd']} /></p>
            </Box>
            <Box className='MarketData'>
              <p><strong>Market Cap</strong> <Fiat value={singleMarketData['market_cap_usd']} /></p>
            </Box>
            <Box className='MarketData'>
              <p><strong>24 Hour Volume</strong> <Fiat value={singleMarketData['24h_volume_usd']} /></p>
            </Box>
          </div>
          <PriceChart token={abbreviation} />
          <LiveTradeData token={abbreviation} />
        </Section>
      }
    </div>
  )
}

const IndividualMarketDataContainer = connect(mapStateToProps)(IndividualMarketData)

export default IndividualMarketDataContainer

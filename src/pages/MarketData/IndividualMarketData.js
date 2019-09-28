import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { prettyCrypto } from '../../utils'

import Section from '../../components/Bulma/Section'
import Box from '../../components/Bulma/Box'
import Fiat from '../../components/Helpers/Fiat'
import PriceChart from '../../components/Charts/PriceChart'
import LiveTradeData from '../../components/Tables/LiveTradeData'
import Loading from '../../components/Helpers/Loading'

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
  const btcPrice = _.get(marketData, 'BTC.priceUsd');
  const singleMarketData = _.get(marketData, abbreviation);

  return (
    <div>
      {singleMarketData && !loading
        ? <Section title={`${singleMarketData.name} (${abbreviation})`}>
          <div className='IndividualMarketData'>
            <nav className='level is-mobile'>
              <div className='level-item has-text-centered'>
                <div>
                  <p className='heading'>Price</p>
                  <p className='is-size-4'><Fiat value={singleMarketData['priceUsd']} /></p>
                </div>
              </div>
              <div className='level-item has-text-centered'>
                <div>
                  <p className='heading'>Price (BTC)</p>
                  <p className='is-size-4'>{prettyCrypto(singleMarketData['priceUsd'] / btcPrice)} BTC</p>
                </div>
              </div>
              <div className='level-item has-text-centered'>
                <div>
                  <p className='heading'>Market Cap</p>
                  <p className='is-size-4'><Fiat value={singleMarketData['marketCapUsd']} /></p>
                </div>
              </div>
              <div className='level-item has-text-centered'>
                <div>
                  <p className='heading'>24 Hour Volume</p>
                  <p className='is-size-4'><Fiat value={singleMarketData['volumeUsd24Hr']} /></p>
                </div>
              </div>
            </nav>
          </div>
          <PriceChart token={abbreviation} />
          <LiveTradeData token={abbreviation} />
        </Section>
        : <Loading />
      }
    </div>
  )
}

const IndividualMarketDataContainer = connect(mapStateToProps)(IndividualMarketData)

export default IndividualMarketDataContainer

import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { getFiatInfo, prettyFiat } from '../../utils'

import Section from '../../components/Bulma/Section'
import PriceChart from '../../components/Charts/PriceChart'
import LiveTradeData from '../../components/Tables/LiveTradeData'

const mapStateToProps = ({ marketData }, ownProps) => {
  const { abbreviation } = ownProps.match.params
  return {
    abbreviation,
    marketData: marketData.marketData
  }
}

const IndividualMarketData = ({ abbreviation, marketData }) => {
  abbreviation = _.upperCase(abbreviation)
  const singleMarketData = _.find(marketData, ['symbol', abbreviation])

  return (
    <div>
      { singleMarketData &&
        <Section title={`${singleMarketData.name} (${abbreviation})`}>
          <PriceChart token={abbreviation} />
          <LiveTradeData token={abbreviation} />
        </Section>
      }
    </div>
  )
}

const IndividualMarketDataContainer = connect(mapStateToProps)(IndividualMarketData)

export default IndividualMarketDataContainer

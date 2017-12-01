import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { getFiatInfo, prettyFiat } from '../../utils'

import Section from '../../components/Bulma/Section'
import PriceChart from '../../components/Charts/PriceChart'
import LiveTradeData from '../../components/Tables/LiveTradeData'

const mapStateToProps = ({}, ownProps) => {
  const { abbreviation } = ownProps.match.params
  return {
    abbreviation
  }
}

const IndividualMarketData = ({ abbreviation }) => {

  abbreviation = _.upperCase(abbreviation)

  return (
    <div>
      <Section title={abbreviation}>
        <PriceChart token={abbreviation} />
        <LiveTradeData token={abbreviation} />
      </Section>
    </div>
  )
}

const IndividualMarketDataContainer = connect(mapStateToProps)(IndividualMarketData)

export default IndividualMarketDataContainer

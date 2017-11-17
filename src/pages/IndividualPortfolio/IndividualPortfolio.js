import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { getFiatInfo, prettyFiat } from '../../utils'

import Section from '../../components/Bulma/Section'
import Hero from '../../components/Bulma/Hero'

const mapStateToProps = ({portfolio, preferences}, ownProps) => {
  const { abbreviation } = ownProps.match.params
  return {
    abbreviation,
    portfolio,
    preferences
  }
}

const IndividualPortfolio = ({portfolio, preferences, abbreviation}) => {
  abbreviation = _.upperCase(abbreviation)
  const convertedPortfolio = portfolio.convertedPortfolio[abbreviation]
  const fiat = getFiatInfo(preferences.fiat)

  return (
    <div>
      {convertedPortfolio ?
        <Section title={abbreviation}>
        <Hero
          title={`${fiat.symbol} ${prettyFiat(convertedPortfolio.fiatValue)}`}
          subtitle={`${fiat.symbol} ${prettyFiat(convertedPortfolio.dayChange)}`}
          subtitleClassName={Math.sign(convertedPortfolio.dayChange) >= 0 ? 'has-text-success' : 'has-text-danger'} />
        </Section> : ''}
    </div>

  )
}

const IndividualPortfolioContainer = connect(mapStateToProps)(IndividualPortfolio)

export default IndividualPortfolioContainer

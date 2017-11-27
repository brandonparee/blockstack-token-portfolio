import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { getFiatInfo, prettyFiat } from '../../utils'

import Section from '../../components/Bulma/Section'
import Hero from '../../components/Bulma/Hero'
import TransactionChart from '../../components/Charts/TransactionChart'

const mapStateToProps = ({portfolio, preferences, charts}, ownProps) => {
  const { abbreviation } = ownProps.match.params
  const { isFetching, transactionChartData } = charts
  return {
    abbreviation,
    portfolio,
    preferences,
    isFetching,
    transactionChartData
  }
}

class IndividualPortfolio extends Component {
  render() {
    const { portfolio, preferences, transactionChartData, isFetching } = this.props
    let { abbreviation } = this.props
    abbreviation = _.upperCase(abbreviation)
    const convertedPortfolio = portfolio.convertedPortfolio[abbreviation]
    const fiat = getFiatInfo(preferences.fiat)

    return (
      <div>
        {convertedPortfolio
          ? <Section title={abbreviation}>
            <Hero
              title={`${fiat.symbol} ${prettyFiat(convertedPortfolio.fiatValue)}`}
              subtitle={`${fiat.symbol} ${prettyFiat(convertedPortfolio.dayChange)}`}
              subtitleClassName={Math.sign(convertedPortfolio.dayChange) >= 0 ? 'has-text-success' : 'has-text-danger'} />
            <TransactionChart token={abbreviation} transactionChartData={transactionChartData[abbreviation]} isFetching={isFetching} />
          </Section> : ''}
      </div>

    )
  }
}

const IndividualPortfolioContainer = connect(mapStateToProps)(IndividualPortfolio)

export default IndividualPortfolioContainer

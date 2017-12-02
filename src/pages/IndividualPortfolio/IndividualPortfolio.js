import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { getFiatInfo, prettyFiat } from '../../utils'

import Section from '../../components/Bulma/Section'
import Hero from '../../components/Bulma/Hero'
import TransactionChart from '../../components/Charts/TransactionChart'
import TransactionTable from '../../components/Tables/TransactionTable'

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
  render () {
    const { portfolio, preferences, transactionChartData, isFetching } = this.props
    let { abbreviation } = this.props
    abbreviation = _.upperCase(abbreviation)
    let convertedPortfolio = portfolio.convertedPortfolio[abbreviation]
    let fiatValue = convertedPortfolio ? convertedPortfolio.fiatValue : 0
    let dayChange = convertedPortfolio ? convertedPortfolio.dayChange : 0
    const fiat = getFiatInfo(preferences.fiat)

    return (
      <div>
        <Section title={abbreviation}>
          <Hero
            title={`${fiat.symbol} ${prettyFiat(fiatValue)}`}
            subtitle={`${fiat.symbol} ${prettyFiat(dayChange)}`}
            subtitleClassName={Math.sign(dayChange) >= 0 ? 'has-text-success' : 'has-text-danger'} />
          { convertedPortfolio
            ? <div>
              <TransactionChart token={abbreviation} transactionChartData={transactionChartData[abbreviation]} isFetching={isFetching} />
              <TransactionTable abbreviation={abbreviation} />
            </div>
            : ''
          }
        </Section>
      </div>

    )
  }
}

const IndividualPortfolioContainer = connect(mapStateToProps)(IndividualPortfolio)

export default IndividualPortfolioContainer

// TODO Make this the 'simple portfolio', no transactions just edit values

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getExchangeRates } from '../../actions/priceActions'
import { getSelectedTokens, getFiatInfo, prettyFiat } from '../../utils'

import SingleHolding from './SingleHolding'

import TransactionForm from '../../components/Forms/TransactionForm'
import Hero from '../../components/Bulma/Hero'
import Section from '../../components/Bulma/Section'

const mapStateToProps = ({portfolio, preferences, price}) => {
  return {
    portfolio,
    preferences,
    price
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getInitialData: () => {
      dispatch(getExchangeRates())
    }
  }
}

class Portfolio extends Component {
  componentDidMount () {
    this.props.getInitialData()
  }

  render () {
    const { portfolio, preferences, price } = this.props
    const tokenList = getSelectedTokens(preferences)
    const fiat = getFiatInfo(preferences.fiat)

    return (
      <Section title='Portfolio'>
        <Hero
          title={`${fiat.symbol} ${prettyFiat(portfolio.totalValue)}`}
          subtitle={`${fiat.symbol} ${prettyFiat(portfolio.dayChange)}`}
          subtitleClassName={Math.sign(portfolio.dayChange) >= 0 ? 'has-text-success' : 'has-text-danger'} />
        <TransactionForm />
        {
            tokenList.map((token) => {
              if (token === 'BTC' || (price.tokenRates[`BTC_${token}`] && fiat)) {
                return (
                  <SingleHolding
                    key={token}
                    abbreviation={token}
                    tokenRates={prettyFiat(1 / price.tokenRates[token])} />
                )
              }
              return ''
            })
        }
      </Section>
    )
  }
}

const PortfolioContainer = connect(mapStateToProps, mapDispatchToProps)(Portfolio)

export default PortfolioContainer

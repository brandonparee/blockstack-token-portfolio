// TODO Make this the 'simple portfolio', no transactions just edit values

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getExchangeRates } from '../../actions/priceActions'
import { getSelectedTokens, getFiatInfo, prettyFiat } from '../../utils'

import SingleHolding from './SingleHolding'

import TransactionToggle from '../../components/Helpers/TransactionToggle'
import Hero from '../../components/Bulma/Hero'
import Section from '../../components/Bulma/Section'

import './Portfolio.css'

const mapStateToProps = ({ portfolio, preferences, price, transactions }) => {
  return {
    portfolio,
    preferences,
    price,
    transactionView: transactions.transactionView
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
    const { portfolio, preferences, price, transactionView } = this.props
    const tokenList = getSelectedTokens(preferences)
    const fiat = getFiatInfo(preferences.fiat)

    return (
      <div className='Portfolio'>
        <Section title='Portfolio'>
          <Hero
            title={`${fiat.symbol} ${prettyFiat(portfolio.totalValue)}`}
            subtitle={`${fiat.symbol} ${prettyFiat(portfolio.dayChange)}`}
            subtitleClassName={Math.sign(portfolio.dayChange) >= 0 ? 'has-text-success' : 'has-text-danger'} />
          <TransactionToggle>
            {
              (!transactionView)
                ? <a className='button'>Add Transaction</a>
                : <a className='button'>Close</a>
            }
          </TransactionToggle>
          <div className='SingleHoldingLayout'>
            {
              Object.keys(portfolio.portfolioOverview).map((token) => {
                return (
                  <SingleHolding
                    key={token}
                    abbreviation={token} />
                )
              }
              )
            }
          </div>
        </Section>
      </div>
    )
  }
}

const PortfolioContainer = connect(mapStateToProps, mapDispatchToProps)(Portfolio)

export default PortfolioContainer

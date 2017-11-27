// TODO Make this the 'simple portfolio', no transactions just edit values

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getExchangeRates } from '../../actions/priceActions'
import { portfolioEdit, portfolioEditCancel, portfolioSave } from '../../actions/portfolioActions'
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
    },
    handlePortfolioEdit: () => {
      dispatch(portfolioEdit())
    },
    handlePortfolioEditCancel: () => {
      dispatch(portfolioEditCancel())
    },
    handlePorfolioSave: () => {
      dispatch(portfolioSave())
    }
  }
}

class Portfolio extends Component {
  componentDidMount () {
    this.props.getInitialData()
  }

  render () {
    const {
      portfolio, preferences, price, handlePorfolioSave,
      handlePortfolioEdit, handlePortfolioEditCancel
    } = this.props
    const tokenList = getSelectedTokens(preferences)
    const fiat = getFiatInfo(preferences.fiat)

    return (
      <Section title='Portfolio'>
        <Hero
          title={`${fiat.symbol} ${prettyFiat(portfolio.totalValue)}`}
          subtitle={`${fiat.symbol} ${prettyFiat(portfolio.dayChange)}`}
          subtitleClassName={Math.sign(portfolio.dayChange) >= 0 ? 'has-text-success' : 'has-text-danger'} />
        <TransactionForm />
        <p className='is-size-6 has-text-grey'>Input your holdings here by pressing the edit button.</p>
        <p className='is-size-6 has-text-grey'>Transaction functionality coming.</p>
        <div className='buttons'>
          {
              !portfolio.isEdit
              ? <span className='button is-info' onClick={handlePortfolioEdit}>Edit</span>
              : <span className='button is-danger' onClick={handlePortfolioEditCancel}>Cancel</span>
            }
          <span
            className='button is-success'
            disabled={!portfolio.isModified ? 'disabled' : ''}
            onClick={handlePorfolioSave}>
              Save
            </span>
        </div>
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

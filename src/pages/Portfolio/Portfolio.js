import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getTokenExchangeRates } from '../../actions/priceActions'
import { portfolioEdit, portfolioEditCancel, portfolioSave, getConvertedPortfolio } from '../../actions/portfolioActions'
import { getSelectedTokens, getFiatInfo, prettyFiat } from '../../utils'

import SingleHolding from './SingleHolding'

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
      dispatch(getTokenExchangeRates())
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
      <section className='section'>
        <h1 className='title'>Portfolio</h1>
        <div className="hero">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">
                {fiat.symbol}{prettyFiat(portfolio.totalValue)}
              </h1>
              <h2 className={`subtitle ${Math.sign(portfolio.dayChange) >= 0 ? 'has-text-success' : 'has-text-danger'}`}>
                {fiat.symbol} {prettyFiat(portfolio.dayChange)}
              </h2>
            </div>
          </div>
        </div>
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
      </section>
    )
  }
}

const PortfolioContainer = connect(mapStateToProps, mapDispatchToProps)(Portfolio)

export default PortfolioContainer

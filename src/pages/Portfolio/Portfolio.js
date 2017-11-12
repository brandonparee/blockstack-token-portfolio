import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fiatPriceUpdate } from '../../actions/priceActions'
import { portfolioEdit, portfolioEditCancel, portfolioSave } from '../../actions/portfolioActions'
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
    fiatPriceUpdate: () => {
      dispatch(fiatPriceUpdate())
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
    this.props.fiatPriceUpdate()
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
        <p className='is-size-6 has-text-grey'>Input your holdings here by pressing the edit button.</p>
        <p className='is-size-6 has-text-grey'>Transaction functionality coming.</p>
        {
            tokenList.map((token) => {
              if (price.fiatPrice[token] && fiat) {
                return (
                  <SingleHolding
                    key={token}
                    abbreviation={token}
                    fiatPrice={prettyFiat(1 / price.fiatPrice[token])} />
                )
              }
              return ''
            })
          }
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
      </section>
    )
  }
}

const PortfolioContainer = connect(mapStateToProps, mapDispatchToProps)(Portfolio)

export default PortfolioContainer

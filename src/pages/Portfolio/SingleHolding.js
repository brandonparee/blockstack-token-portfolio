import React from 'react'
import { connect } from 'react-redux'
import { portfolioLocalEdit, getConvertedPortfolio } from '../../actions/portfolioActions'
import { getTokenName, getFiatInfo, prettyFiat } from '../../utils'

const mapStateToProps = ({portfolio, preferences, price}) => {
  return {
    portfolio,
    preferences,
    price
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleInputChange: (e) => {
      const { id, value } = e.target

      dispatch(portfolioLocalEdit(id, value))
      dispatch(getConvertedPortfolio())
    }
  }
}

const SingleHolding = ({portfolio, preferences, price, abbreviation, handleInputChange}) => {
  const { convertedPortfolio } = portfolio
  const currentStats = convertedPortfolio[abbreviation] ? convertedPortfolio[abbreviation] : {amount: 0, fiatValue: 0, dayChange: 0, percentChange: 0}
  const fiatInfo = getFiatInfo(preferences.fiat)

  return (
    <div>
      {
        preferences.tokens[abbreviation]
        ? <div className='field is-horizontal'>
          <div className='field-label is-normal'>
            <label className='label'>{getTokenName(abbreviation)} ({abbreviation})</label>
          </div>
          <div className='field-body'>
            <div className='field'>
              <p className='control'>
                <input
                  id={abbreviation}
                  type='text'
                  className={`input${!portfolio.isEdit ? ' is-static' : ''}`}
                  onChange={handleInputChange}
                  readOnly={!portfolio.isEdit}
                  value={currentStats.amount ? currentStats.amount + (!portfolio.isEdit ? ` ${abbreviation}` : '') : 0} />
              </p>
              <p className='control'>{fiatInfo.symbol}{prettyFiat(currentStats.fiatValue)}</p>
              <p
                className={`control ${Math.sign(currentStats.dayChange) >= 0 ? 'has-text-success' : 'has-text-danger'}`}>
                {fiatInfo.symbol}{prettyFiat(currentStats.dayChange)} ({prettyFiat(currentStats.percentChange * 100)}%)
              </p>
            </div>
          </div>
        </div> : ''
      }
    </div>

  )
}

const SingleHoldingContainer = connect(mapStateToProps, mapDispatchToProps)(SingleHolding)

export default SingleHoldingContainer

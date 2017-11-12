import React from 'react'
import { connect } from 'react-redux'
import { portfolioLocalEdit } from '../../actions/portfolioActions'
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
    }
  }
}

const SingleHolding = ({portfolio, preferences, price, abbreviation, handleInputChange}) => {
  const { tokens } = portfolio
  const fiatInfo = getFiatInfo(preferences.fiat)
  const inputClassName = `input${!portfolio.isEdit ? ' is-static' : ''}`
  const inputValue = `${tokens && tokens[abbreviation] ? tokens[abbreviation] : 0}`

  const btcValue = (!(abbreviation === 'BTC') ? price.tokenRates[`BTC_${abbreviation}`].last : 1)
  const fiatValue = btcValue * price.tokenRates.USDT_BTC.last * inputValue
  const percentChange = 1 + parseFloat((!(abbreviation === 'BTC') ? price.tokenRates[`BTC_${abbreviation}`].percentChange : price.tokenRates[`USDT_BTC`].percentChange))
  const dayChange = fiatValue - fiatValue / percentChange

  return (
    <div className='field is-horizontal'>
      <div className='field-label is-normal'>
        <label className='label'>{getTokenName(abbreviation)} ({abbreviation})</label>
      </div>
      <div className='field-body'>
        <div className='field'>
          <p className='control'>
            <input
              id={abbreviation}
              type='text'
              className={inputClassName}
              onChange={handleInputChange}
              readOnly={!portfolio.isEdit}
              value={inputValue + (!portfolio.isEdit ? ` ${abbreviation}` : '')} />
          </p>
          <p className='control'>{fiatInfo.symbol}{prettyFiat(fiatValue)}</p>
          <p className='control'>{fiatInfo.symbol}{prettyFiat(dayChange)}</p>
        </div>
      </div>
    </div>
  )
}

const SingleHoldingContainer = connect(mapStateToProps, mapDispatchToProps)(SingleHolding)

export default SingleHoldingContainer

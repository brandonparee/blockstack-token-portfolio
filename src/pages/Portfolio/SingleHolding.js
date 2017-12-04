import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getFiatInfo, prettyFiat, prettyCrypto } from '../../utils'

import Fiat from '../../components/Helpers/Fiat'
import PrettyPercent from '../../components/Helpers/PrettyPercent'

const mapStateToProps = ({portfolio, preferences, marketData}) => {
  return {
    portfolio,
    preferences,
    coinList: marketData.coinList
  }
}

const SingleHolding = ({ portfolio, preferences, abbreviation, coinList }) => {
  const { convertedPortfolio } = portfolio
  const currentStats = convertedPortfolio[abbreviation] ? convertedPortfolio[abbreviation] : {amount: 0, fiatValue: 0, dayChange: 0, percentChange: 0}
  const fiatInfo = getFiatInfo(preferences.fiat)
  const tokenInfo = coinList[abbreviation]

  return (
    <div className='SingleHolding'>
      {
        tokenInfo ?
        <Link to={`/portfolio/${abbreviation.toLowerCase()}`}>
          <div className='box'>
            <div className='media-content'>
              <p className='link-style has-text-centered'>{tokenInfo.FullName}</p>
              <p><Fiat value={currentStats.fiatValue} /> {`(${prettyCrypto(currentStats.amount)} ${tokenInfo.Symbol})`}</p>
              <p className={Math.sign(currentStats.dayChange) >= 0 ? 'has-text-success' : 'has-text-danger'}>
                <Fiat value={currentStats.dayChange} /> {`(${prettyCrypto(currentStats.dayChangeBtc)} BTC)`}
              </p>
              <p><PrettyPercent value={prettyFiat(currentStats.percentChange)} /></p>
            </div>
          </div>
        </Link>
        : ''
      }
    </div>

  )
}

const SingleHoldingContainer = connect(mapStateToProps)(SingleHolding)

export default SingleHoldingContainer

import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { portfolioLocalEdit, getConvertedPortfolio } from '../../actions/portfolioActions'
import { getTokenName, getFiatInfo, prettyFiat, prettyCrypto } from '../../utils'

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
      <Link to={`/portfolio/${abbreviation.toLowerCase()}`}>
        <div className='box'>
          <div className='media-content'>
            <p className='link-style'>{tokenInfo.FullName}</p>
            <p>{`${prettyCrypto(currentStats.amount)}${abbreviation}`}</p>
            <p>{fiatInfo.symbol}{prettyFiat(currentStats.fiatValue)}</p>
            <PrettyPercent value={prettyFiat(currentStats.percentChange)} />
          </div>
        </div>
      </Link>
    </div>

  )
}

const SingleHoldingContainer = connect(mapStateToProps)(SingleHolding)

export default SingleHoldingContainer

import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { portfolioLocalEdit, getConvertedPortfolio } from '../../actions/portfolioActions'
import { getTokenName, getFiatInfo, prettyFiat, prettyCrypto } from '../../utils'

import PrettyPercent from '../../components/Helpers/PrettyPercent'

const mapStateToProps = ({portfolio, preferences}) => {
  return {
    portfolio,
    preferences
  }
}

const SingleHolding = ({portfolio, preferences, abbreviation}) => {
  const { convertedPortfolio } = portfolio
  const currentStats = convertedPortfolio[abbreviation] ? convertedPortfolio[abbreviation] : {amount: 0, fiatValue: 0, dayChange: 0, percentChange: 0}
  const fiatInfo = getFiatInfo(preferences.fiat)

  return (
    <div className='SingleHolding'>
      <Link to={`/portfolio/${abbreviation.toLowerCase()}`}>
        <div className='box'>
          <div className='media-content'>
            <p className='link-style'>Name...{abbreviation}</p>
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

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
  console.log(currentStats)

  return (
    <div className='SingleHolding'>
      <Link to={`/portfolio/${abbreviation.toLowerCase()}`}>
        <div className="box">
          <div className="media-content">
            <Link to={`/portfolio/${abbreviation.toLowerCase()}`}>{getTokenName(abbreviation)} ({abbreviation})</Link>
            <p>{`${prettyCrypto(currentStats.amount)}${abbreviation}`}</p>
            <p>{fiatInfo.symbol}{prettyFiat(currentStats.fiatValue)}</p>
            <PrettyPercent value={prettyFiat(currentStats.percentChange * 100)} />
          </div>
        </div>
      </Link>
    </div>

  )
}

const SingleHoldingContainer = connect(mapStateToProps)(SingleHolding)

export default SingleHoldingContainer

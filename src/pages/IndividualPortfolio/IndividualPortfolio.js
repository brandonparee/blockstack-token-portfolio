import React from 'react'
import { connect } from 'react-redux'

const mapStateToProps = ({}) => {
  return {}
}

const IndividualPortfolio = ({}) => {
  return (
    <div>
      <h1>IndividualPortfolio</h1>
    </div>
  )
}

const IndividualPortfolioContainer = connect(mapStateToProps)(IndividualPortfolio)

export default IndividualPortfolioContainer

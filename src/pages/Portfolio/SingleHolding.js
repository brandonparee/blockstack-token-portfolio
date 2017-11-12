import React from 'react'
import { connect } from 'react-redux'

const mapStateToProps = (portfolio) => {
  return {
    portfolio
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

const SingleHolding = ({portfolio, test}) => {
  return (
    <p>{test}</p>
  )
}

const SingleHoldingContainer = connect(mapStateToProps, mapDispatchToProps)(SingleHolding)

export default SingleHoldingContainer

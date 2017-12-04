import React from 'react'
import { connect } from 'react-redux'
import { handleTransactionToggle } from '../../actions/transactionActions'

const mapDispatchToProps = (dispatch) => {
  return {
    handleToggleClick: () => {
      dispatch(handleTransactionToggle())
    }
  }
}

const TransactionToggle = ({ handleToggleClick, children }) => {
  return (
    <div>
      <span onClick={() => handleToggleClick()}>{children}</span>
    </div>
  )
}

export default connect(null, mapDispatchToProps)(TransactionToggle)

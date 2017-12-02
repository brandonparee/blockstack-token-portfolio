import React from 'react'
import { connect } from 'react-redux'

import TransactionForm from '../Forms/TransactionForm'
import TransactionToggle from '../Helpers/TransactionToggle'

const TransactionFormSidebar = () => {
  return (
    <div className='side-pane'>
      <TransactionToggle>
        <a className='button is-pulled-right'>Close</a><br />
      </TransactionToggle>
      <TransactionForm />
    </div>
  )
}

export default TransactionFormSidebar

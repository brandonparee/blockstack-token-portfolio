import React from 'react'

import TransactionForm from '../Forms/TransactionForm'
import TransactionToggle from '../Helpers/TransactionToggle'

import './TransactionFormSidebar.css'

const TransactionFormSidebar = () => {
  return (
    <div className='side-pane TransactionFormSidebar'>
      <TransactionToggle>
        <a className='button is-pulled-right'>Close</a><br />
      </TransactionToggle>
      <TransactionForm />
    </div>
  )
}

export default TransactionFormSidebar

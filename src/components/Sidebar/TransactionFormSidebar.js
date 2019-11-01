import React from 'react'

import TransactionForm from '../Forms/TransactionForm'
import TransactionToggle from '../Helpers/TransactionToggle'

import './TransactionFormSidebar.scss'

const TransactionFormSidebar = () => {
  return (
    <div className='side-pane TransactionFormSidebar'>
      <TransactionToggle>
        <button type="button" className='button is-pulled-right'>Close</button><br />
      </TransactionToggle>
      <TransactionForm />
    </div>
  )
}

export default TransactionFormSidebar

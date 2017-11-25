import React from 'react'
import { connect } from 'react-redux'
import { addTransaction } from '../../actions/transactionActions'
import { getTokenList, getFiatList } from '../../utils'
import { required, number, date } from './validation'

import { reduxForm, Field } from 'redux-form'
import RenderDatePicker from './DatePicker'
import { RenderInput } from './Input'
import { RenderSelect } from './Select'

const mapDispatchToProps = (dispatch) => {
  return {
    addTransaction: (transaction) => {
      dispatch(addTransaction(transaction))
    }
  }
}

const TransactionForm = ({ handleSubmit, addTransaction }) => {
  return (
    <form onSubmit={handleSubmit(addTransaction)}>
      <Field name='abbreviation'
        label='Cryptocurrency'
        type='string'
        options={getTokenList()}
        component={RenderSelect}
        validate={[required]} />
      <Field name='amount'
        label='Amount'
        type='number'
        component={RenderInput}
        validate={[required, number]} />
      <Field name='purchasePrice'
        label='Purchase Price'
        type='number'
        component={RenderInput}
        validate={[required, number]} />
      <Field name='fiat'
        label='Purchased With'
        type='string'
        options={getFiatList()}
        component={RenderSelect}
        validate={[required]} />
      <Field name='date'
        label='Transaction Date'
        type='number'
        component={RenderDatePicker}
        validate={[required, date]} />
      <div className='field'>
        <div className='control'>
          <button className='button is-link'>Submit</button>
        </div>
      </div>
    </form>
  )
}

const TransactionFormContainer = reduxForm({
  form: 'transaction'
})(connect(null, mapDispatchToProps)(TransactionForm))

export default TransactionFormContainer

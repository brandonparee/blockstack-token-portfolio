import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { addTransaction, getTradingPairs } from '../../actions/transactionActions'
import { getTradePairPrice } from '../../actions/priceActions'
import { getTokenList, getFiatList } from '../../utils'
import { required, number, date } from './validation'

import { reduxForm, Field, change } from 'redux-form'
import RenderDateTimePicker from './DateTimePicker'
import { RenderInput } from './Input'
import { RenderSelect } from './Select'
import SearchableSelect from './SearchableSelect'

const mapStateToProps = ({ marketData, transactions }) => {
  return {
    coinList: marketData.coinList,
    pairsList: transactions.form.pairs,
    price: transactions.form.price,
    toSymbol: transactions.form.toSymbol,
    fromSymbol: transactions.form.fromSymbol
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addTransaction: (transaction) => {
      dispatch(addTransaction(transaction))
    },
    getTradingPairs: (symbol) => {
      dispatch(getTradingPairs(symbol))
    },
    getTradePairPrice: (toSymbol, fromSymbol) => {
      dispatch(getTradePairPrice(toSymbol, fromSymbol))
    }
  }
}

class TransactionForm extends Component {
  componentWillUpdate (nextProps, nextState) {
    if (nextProps.price !== this.props.price) {
      this.props.dispatch(change('transaction', 'purchasePrice', nextProps.price))
    }
  }

  render () {
    const { handleSubmit, addTransaction, coinList, pairsList, getTradingPairs, getTradePairPrice, price, toSymbol, fromSymbol } = this.props
    const sortedCoinList = _.sortBy(Object.values(coinList), (coin) => { return parseInt(coin.SortOrder) })
    return (
      <form onSubmit={handleSubmit(addTransaction)}>
        <Field name='fromSymbol'
          label='Cryptocurrency'
          options={sortedCoinList}
          valueKey='Symbol'
          labelKey='FullName'
          searchable
          component={SearchableSelect}
          dispatchOnSelect={getTradingPairs}
          validate={[required]} />

        <Field name='type'
          label='Transaction Type'
          type='string'
          options={['Buy', 'Sell']}
          component={RenderSelect}
          validate={[required]} />

        <Field name='toSymbol'
          label='Pair'
          options={pairsList}
          valueKey='toSymbol'
          labelKey='label'
          searchable
          component={SearchableSelect}
          dispatchOnSelect={getTradePairPrice}
          validate={[required]} />

        <Field name='purchasePrice'
          label={`Price ${toSymbol ? `in ${toSymbol}` : ''}`}
          type='number'
          component={RenderInput}
          validate={[required, number]} />

        <Field name='amount'
          label={`Amount ${fromSymbol ? `in ${fromSymbol}` : ''}`}
          type='number'
          component={RenderInput}
          validate={[required, number]} />

        <Field name='date'
          label='Transaction Date'
          type='number'
          component={RenderDateTimePicker}
          validate={[required, date]} />

        <Field name='deduct'
          label={`Deduct from ${toSymbol || ''} holdings?`}
          options={[{label: 'Yes', value: true}, {label: 'No', value: false}]}
          component={SearchableSelect}
          validate={[required]} />

        <div className='field'>
          <div className='control'>
            <button className='button is-link'>Submit</button>
          </div>
        </div>
      </form>
    )
  }
}

const TransactionFormContainer = reduxForm({
  form: 'transaction'
})(connect(mapStateToProps, mapDispatchToProps)(TransactionForm))

export default TransactionFormContainer

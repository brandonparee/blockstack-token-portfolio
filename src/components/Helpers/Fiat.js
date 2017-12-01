import React from 'react'
import { connect } from 'react-redux'
import currencyFormatter from 'currency-formatter'
import { getFiatInfo } from '../../utils'

const mapStateToProps = ({ preferences, price }) => {
  return {
    fiatPreference: preferences.fiat,
    fiatRates: price.fiatRates
  }
}

const Fiat = ({ fiatRates, value, fiatPreference }) => {

  return (
    <span>{currencyFormatter.format(value * fiatRates[fiatPreference], { code: fiatPreference })}</span>
  )
}

export default connect(mapStateToProps)(Fiat)

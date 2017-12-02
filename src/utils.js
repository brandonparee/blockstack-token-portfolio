import _ from 'lodash'

export const defaultConfig = {
  'preferences.json': {
    fiat: 'USD',
    tokens: {
      BTC: true,
      ETH: true,
      BCH: true,
      ETC: true,
      LTC: true,
      DASH: true,
      XMR: true,
      ZEC: true,
      XPR: true
    }
  },
  'portfolio.json': {
    BTC: 0,
    ETH: 0
  },
  'transactions.json': []
}

const tokens = [
  { name: 'Bitcoin', abbreviation: 'BTC' },
  { name: 'Bitcoin Cash', abbreviation: 'BCH' },
  { name: 'Ethereum', abbreviation: 'ETH' },
  { name: 'Ethereum Classic', abbreviation: 'ETC' },
  { name: 'Litecoin', abbreviation: 'LTC' },
  { name: 'Dash', abbreviation: 'DASH' },
  { name: 'Monero', abbreviation: 'XMR' },
  { name: 'Zcash', abbreviation: 'ZEC' },
  { name: 'Ripple', abbreviation: 'XRP' }

]

const fiat = [
  { name: 'US Dollar', abbreviation: 'USD', symbol: '$' },
  { name: 'Euro', abbreviation: 'EUR', symbol: '€' },
  { name: 'Japanese Yen', abbreviation: 'JPY', symbol: '¥' },
  { name: 'British Pound', abbreviation: 'GBP', symbol: '£' },
  { name: 'Swiss Franc', abbreviation: 'CHF', symbol: 'CHF' },
  { name: 'Canadian Dollar', abbreviation: 'CAD', symbol: '$' },
  { name: 'Australian Dollar', abbreviation: 'AUD', symbol: '$' },
  { name: 'New Zealand Dollar', abbreviation: 'NZD', symbol: '$' },
  { name: 'South African Rand', abbreviation: 'ZAR', symbol: 'R' },
  { name: 'Chinese Yuan', abbreviation: 'CNY', symbol: ' ¥' }
]

export const getTokenList = () => {
  return tokens
}

export const getFiatList = () => {
  return fiat
}

export const getSelectedTokens = (preferences) => {
  const { tokens } = preferences
  const tokenList = []

  _.forEach(tokens, (value, key) => {
    if (value) {
      tokenList.push(key)
    }
  })

  return tokenList
}

export const getTokenName = (code) => {
  return _.find(tokens, { abbreviation: code }).name
}

export const getFiatInfo = (code) => {
  return _.find(fiat, { abbreviation: code })
}

export const prettyFiat = (value) => {
  if (Math.abs(value) > 1 || value === 0) {
    return parseFloat(value).toFixed(2)
  }

  return parseFloat(value).toFixed(6)
}

export const prettyCrypto = (value) => {
  return parseFloat(value).toFixed(6)
}

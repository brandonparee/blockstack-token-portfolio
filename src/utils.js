const tokens = [
  {
    name: 'Bitcoin',
    symbol: 'btc'
  },
  {
    name: 'Bitcoin Cash',
    symbol: 'bch'
  },
  {
    name: 'Ethereum',
    symbol: 'eth'
  },
  {
    name: 'Ethereum Classic',
    symbol: 'etc'
  }
]

const fiat = [
  {
    name: 'US Dollar',
    abbreviation: 'usd',
    symbol: '$'
  },
  {
    name: 'Euro',
    abbreviation: 'eur',
    symbol: '€'
  },
  {
    name: 'Japanese Yen',
    abbreviation: 'jpy',
    symbol: '¥'
  }
]

export const getTokenList = () => {
  return tokens
}

export const getFiatList = () => {
  return fiat
}

const tokens = [
  { name: 'Bitcoin', symbol: 'btc' },
  { name: 'Bitcoin Cash', symbol: 'bch' },
  { name: 'Ethereum', symbol: 'eth' },
  { name: 'Ethereum Classic', symbol: 'etc' },
  { name: 'Litecoin', symbol: 'ltc' },
  { name: 'Dash', symbol: 'dash' },
  { name: 'Monero', symbol: 'xmr' },
  { name: 'Zcash', symbol: 'zec' },
  { name: 'Ripple', symbol: 'xrp' }

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

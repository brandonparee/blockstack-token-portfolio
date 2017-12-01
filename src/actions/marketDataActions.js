import axios from 'axios'
import _ from 'lodash'
import { getTokenList } from '../utils'

export const MARKET_DATA_ERROR = 'MARKET_DATA_ERROR'
export const MARKET_DATA_FETCH = 'MARKET_DATA_FETCH'
export const MARKET_DATA_SUCCESS = 'MARKET_DATA_SUCCESS'

const coinMarketCap = `https://api.coinmarketcap.com/v1/ticker/`

export const getMarketData = () => {
  return (dispatch, getState) => {
    dispatch({ type: MARKET_DATA_FETCH })

    axios.get(coinMarketCap)
      .then((res) => {
        const tokens = getTokenList()
        const marketData = res.data.filter((singleToken) => {
          if (_.find(tokens, ['abbreviation', singleToken.symbol])) {
            return true
          }
        })

        dispatch({ type: MARKET_DATA_SUCCESS, payload: marketData })
      })
      .catch((error) => {
        dispatch({ type: MARKET_DATA_ERROR, payload: error })
      })
  }
}

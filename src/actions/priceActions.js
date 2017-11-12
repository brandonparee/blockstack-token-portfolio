import axios from 'axios'
import _ from 'lodash'

export const FIAT_PRICE_UPDATE_REQUEST = 'FIAT_PRICE_UPDATE_REQUEST'
export const FIAT_PRICE_UPDATE_ERROR = 'FIAT_PRICE_UPDATE_ERROR'
export const FIAT_PRICE_UPDATE_SUCCESS = 'FIAT_PRICE_UPDATE_SUCCESS'

// TODO Refactor all of this, its pretty gross

const cryptoCompare = `https://min-api.cryptocompare.com/data`

const mapTokens = (tokens) => {
  let tokenList = []

  Object.keys(tokens).map((token) => {
    if (tokens[token]) {
      tokenList.push(token)
    }
  })

  return tokenList
}

export const fiatPriceUpdate = () => {
  return (dispatch, getState) => {
    dispatch({type: FIAT_PRICE_UPDATE_REQUEST})

    const localPreferences = JSON.parse(localStorage.getItem('preferences'))
    const preferences = getState().preferences
    let tokens

    if (!_.isEmpty(preferences.tokens)) {
      tokens = mapTokens(preferences.tokens)
    } else {
      tokens = mapTokens(localPreferences.tokens)
    }

    // TODO add timestamp, cache API call for 1 min

    return axios.get(`${cryptoCompare}/price`, {
      params: {
        fsym: preferences.fiat ? preferences.fiat : localPreferences.fiat,
        tsyms: tokens.toString()
      }
    })
    .then((res) => {
      dispatch({type: FIAT_PRICE_UPDATE_SUCCESS, payload: res.data})
    })
    .catch((error) => {
      dispatch({type: FIAT_PRICE_UPDATE_ERROR, payload: error})
    })
  }
}

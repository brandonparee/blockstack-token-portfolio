import { getBlockstackFile, putBlockstackFile } from './fileActions'

export const FETCH_PORTFOLIO = 'FETCH_PORTFOLIO'
export const PORTFOLIO_ADD_TRANSACTION = 'PORTFOLIO_ADD_TRANSACTION'
export const PORTFOLIO_EDIT = 'PORTFOLIO_EDIT'
export const PORTFOLIO_EDIT_CANCEL = 'PORTFOLIO_EDIT_CANCEL'
export const PORTFOLIO_LOCAL_EDIT = 'PORTFOLIO_LOCAL_EDIT'
export const PORTFOLIO_SAVE = 'PORTFOLIO_SAVE'

export const getPortfolio = () => {
  return (dispatch) => {
    dispatch({ type: FETCH_PORTFOLIO })

    dispatch(getBlockstackFile('portfolio.json', true))
  }
}

export const portfolioSave = () => {
  return (dispatch, getState) => {
    const portfolio = getState().portfolio.tokens
    dispatch({ type: PORTFOLIO_SAVE, payload: { ...portfolio } })

    dispatch(putBlockstackFile('portfolio.json', portfolio, true))
  }
}

export const portfolioEdit = () => {
  return { type: PORTFOLIO_EDIT }
}

export const portfolioEditCancel = () => {
  return { type: PORTFOLIO_EDIT_CANCEL }
}

export const portfolioLocalEdit = (target, value) => {
  return { type: PORTFOLIO_LOCAL_EDIT, payload: { target, value }}
}

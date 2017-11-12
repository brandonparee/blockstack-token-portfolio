import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

import { userReducer } from './reducers/userReducer'
import { fetchUserData } from './actions/userActions'
import { fileReducer } from './reducers/fileReducer'
import { editorReducer } from './reducers/editorReducer'
import { portfolioReducer } from './reducers/portfolioReducer'
import { fiatPriceUpdate } from './actions/priceActions'
import { priceReducer } from './reducers/priceReducer'
import { preferencesReducer } from './reducers/preferencesReducer'
import 'bulma/css/bulma.css'
import './index.css'
import App from './layouts/App'
import registerServiceWorker from './registerServiceWorker'

// Setup for react-router
const history = createHistory()
const middleware = routerMiddleware(history)

// Setup for redux
export const store = createStore(
  combineReducers({
    editor: editorReducer,
    file: fileReducer,
    portfolio: portfolioReducer,
    preferences: preferencesReducer,
    price: priceReducer,
    router: routerReducer,
    user: userReducer
  }),
  applyMiddleware(middleware, createLogger(), thunkMiddleware)
)

store.dispatch(fetchUserData())
store.dispatch(fiatPriceUpdate())

// Initialize React application
ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'))

registerServiceWorker()

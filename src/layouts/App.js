import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { getPortfolio } from '../actions/portfolioActions'
import { getPreferences } from '../actions/preferencesActions'
import { getExchangeRates } from '../actions/priceActions'
import { getMarketData } from '../actions/marketDataActions'

import Authenticated from '../components/Authenticated/Authenticated'
import Public from '../components/Public/Public'
import Sidebar from '../components/Sidebar/Sidebar'

import HandleLogin from '../pages/Login/HandleLogin'
import Home from '../pages/Home/Home'
import IndividualPortfolio from '../pages/IndividualPortfolio/IndividualPortfolio'
import Login from '../pages/Login/Login'
import Logout from '../pages/Logout/Logout'
import MarketData from '../pages/MarketData/MarketData'
import IndividualMarketData from '../pages/MarketData/IndividualMarketData'
import Portfolio from '../pages/Portfolio/Portfolio'
import Preferences from '../pages/Preferences/Preferences'
import Secret from '../pages/Secret/Secret'
import TransactionFormSidebar from '../components/Sidebar/TransactionFormSidebar'

const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPreferences: () => {
      dispatch(getPreferences())
    },
    getExchangeRates: () => {
      dispatch(getExchangeRates())
    },
    getPortfolio: () => {
      dispatch(getPortfolio())
    },
    getMarketData: () => {
      dispatch(getMarketData())
    }
  }
}

class App extends Component {
  componentDidMount () {
    if (this.props.user.isAuthenticated) {
      this.props.getPreferences()
      this.props.getExchangeRates()
      this.props.getPortfolio()
      this.props.getMarketData()
    }
  }

  render () {
    const { user, transactions } = this.props
    const { isAuthenticated } = user

    return (
      <div className={`layout ${transactions.transactionView ? 'transaction-mode' : ''}`}>
        <div className='navigation is-bastille'>
          <Sidebar />
        </div>
        <div className='main is-alabaster'>
          {
              (user.isAuthenticated)
              ? <Switch>
                <Authenticated path='/' exact name='home' component={Portfolio} isAuthenticated={isAuthenticated} />
                <Authenticated path='/market-data' exact name='market-data' component={MarketData} isAuthenticated={isAuthenticated} />
                <Authenticated path='/market-data/:abbreviation' component={IndividualMarketData} isAuthenticated={isAuthenticated} />
                <Authenticated path='/portfolio' exact name='portfolio' component={Portfolio} isAuthenticated={isAuthenticated} />
                <Authenticated path='/portfolio/:abbreviation' component={IndividualPortfolio} isAuthenticated={isAuthenticated} />
                <Authenticated path='/preferences' exact name='preferences' component={Preferences} isAuthenticated={isAuthenticated} />
                <Authenticated path='/secret' exact name='secret' component={Secret} isAuthenticated={isAuthenticated} />
              </Switch>
              : <Switch>
                <Public path='/' exact name='login' component={Login} isAuthenticated={isAuthenticated} />
                <Public path='/handle-login' name='handle-login' component={HandleLogin} isAuthenticated={isAuthenticated} />
              </Switch>
            }
          <Route path='/logout' exact component={Logout} />
        </div>
        {
          (user.isAuthenticated && transactions.transactionView)
          ? <TransactionFormSidebar />
          : null
        }
      </div>
    )
  }
}

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App)

export default AppContainer

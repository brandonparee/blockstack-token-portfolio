import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { getPortfolio } from '../actions/portfolioActions'
import { getPreferences } from '../actions/preferencesActions'
import { getTokenExchangeRates, getFiatExchangeRates } from '../actions/priceActions'

import Authenticated from '../components/Authenticated/Authenticated'
import Public from '../components/Public/Public'
import Sidebar from '../components/Sidebar/Sidebar'

import HandleLogin from '../pages/Login/HandleLogin'
import Login from '../pages/Login/Login'
import Logout from '../pages/Logout/Logout'
import Portfolio from '../pages/Portfolio/Portfolio'
import Preferences from '../pages/Preferences/Preferences'
import Secret from '../pages/Secret/Secret'

const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPreferences: () => {
      dispatch(getPreferences())
    },
    getTokenExchangeRates: () => {
      dispatch(getTokenExchangeRates())
    },
    getFiatExchangeRates: () => {
      dispatch(getFiatExchangeRates())
    },
    getPortfolio: () => {
      dispatch(getPortfolio())
    }
  }
}

class App extends Component {
  componentDidMount () {
    if (this.props.user.isAuthenticated) {
      this.props.getPreferences()
      this.props.getTokenExchangeRates()
      this.props.getFiatExchangeRates()
      this.props.getPortfolio()
    }
  }

  render () {
    const { user } = this.props
    const { isAuthenticated } = user

    return (
      <main>
        <div className='columns is-gapless'>
          <div className='column is-one-quarter'>
            <Sidebar />
          </div>
          <div className='column'>
            {
                (user.isAuthenticated)
                ? <Authenticated path='/' exact name='portfolio' component={Portfolio} isAuthenticated={isAuthenticated} />
                : <Public path='/' exact name='login' component={Login} isAuthenticated={isAuthenticated} />
              }
            <Route path='/logout' exact component={Logout} />
            <Public path='/handle-login' name='handle-login' component={HandleLogin} isAuthenticated={isAuthenticated} />
            <Authenticated path='/preferences' exact name='preferences' component={Preferences} isAuthenticated={isAuthenticated} />
            <Authenticated path='/secret' exact name='secret' component={Secret} isAuthenticated={isAuthenticated}/>
          </div>
        </div>
      </main>
    )
  }
}

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App)

export default AppContainer

import React from 'react'
import { connect } from 'react-redux'
import { loginWithBlockstack } from '../../actions/userActions'

import './Login.css'

const mapStateToProps = ({user}) => {
  return {
    user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: () => {
      dispatch(loginWithBlockstack())
    }
  }
}

const Login = ({user, onClick, ...rest}) => {
  return (
    <section className='hero is-fullheight Login'>
      <div className='hero-body'>
        <div className='container has-text-centered'>
          <h1 className='title'>peachy portfolio.</h1>
          <h2 className='subtitle'>Login with Blockstack</h2>
          <button className='button is-medium' onClick={onClick}>Log In</button>
        </div>
      </div>
    </section>
  )
}

const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login)

export default LoginContainer

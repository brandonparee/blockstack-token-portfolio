import React from 'react'
import { connect } from 'react-redux'

import { updateFiatPreference, updateTokenPreference } from '../../actions/preferencesActions'
import { getFiatList, getTokenList } from '../../utils'

const fiatList = getFiatList()

const tokenList = getTokenList()

const mapStateToProps = ({preferences}) => {
  return {
    preferences
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleFiatPreferenceChange: (e) => {
      const { value } = e.target

      dispatch(updateFiatPreference(value))
    },
    handleTokenPreferenceChange: (e) => {
      const { value, checked } = e.target

      dispatch(updateTokenPreference(value, checked))
    }
  }
}

const Preferences = ({preferences, handleFiatPreferenceChange, handleTokenPreferenceChange}) => {
  return (
    <section className='section'>
      <div className='container'>
        <h1 className='title'>Preferences</h1>
        <div className='field'>
          <label className='label'>Fiat</label>
          <div className='control'>
            <div className='select'>
              <select
                onChange={handleFiatPreferenceChange}
                value={preferences.fiat} >
                {
                  fiatList.map((fiat) => {
                    return (
                      <option
                        key={fiat.abbreviation}
                        value={fiat.abbreviation} >
                        {fiat.symbol} {fiat.name} ({fiat.abbreviation})
                      </option>
                    )
                  })
                }
              </select>
            </div>
          </div>
          <div className='field'>
            <label className='label'>Cryptocurrenies (Tokens)</label>
          </div>
          {
            tokenList.map((token) => {
              return (
                <div key={token.abbreviation}>
                  <label className='checkbox'>
                    <input
                      type='checkbox'
                      onChange={handleTokenPreferenceChange}
                      checked={preferences.tokens[token.abbreviation] ? 'checked' : ''}
                      value={token.abbreviation} />
                    {token.name} ({token.abbreviation})
                    </label>
                </div>
              )
            })
          }
        </div>
      </div>
    </section>
  )
}

const PreferencesContainer = connect(mapStateToProps, mapDispatchToProps)(Preferences)

export default PreferencesContainer

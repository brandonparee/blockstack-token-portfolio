import React from 'react'
import { connect } from 'react-redux'

import Section from '../../components/Bulma/Section'

import { updateFiatPreference, updateTokenPreference } from '../../actions/preferencesActions'
import { getFiatList } from '../../utils'

const fiatList = getFiatList()

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
    <Section title='Preferences'>
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
      </div>
    </Section>
  )
}

const PreferencesContainer = connect(mapStateToProps, mapDispatchToProps)(Preferences)

export default PreferencesContainer

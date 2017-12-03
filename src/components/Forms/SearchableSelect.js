import React, { Component } from 'react'
import _ from 'lodash'
import Select from 'react-select'

import 'react-select/dist/react-select.css'

export default class SearchableSelect extends Component {
  state = { selectedOption: {} }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption })
    this.props.input.onChange(selectedOption)
    if (this.props.dispatchOnSelect && !_.isEmpty(selectedOption)) {
      switch (this.props.input.name) {
        case 'fromSymbol':
          return this.props.dispatchOnSelect(selectedOption.Symbol)
        case 'toSymbol':
          return this.props.dispatchOnSelect(selectedOption.fromSymbol, selectedOption.toSymbol)
        default:
          return this.props.dispatchOnSelect(selectedOption)
      }
    }
  }

  render() {
    const { meta, label, valueKey, labelKey, searchable, options } = this.props

    return (
      <div className='field'>
        <div className='control'>
          <label className='label'>{label}</label>
          <Select
            searchable={searchable}
            matchPos='start'
            onChange={this.handleChange}
            value={this.state.selectedOption}
            valueKey={valueKey}
            labelKey={labelKey}
            options={options} />
          {
            meta.error && meta.touched &&
              <p className='help is-danger'>{meta.error}</p>
          }
        </div>
      </div>
    )
  }
}

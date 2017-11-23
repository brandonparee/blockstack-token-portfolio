import React, { Component } from 'react'
import { SingleDatePicker } from 'react-dates'
import moment from 'moment'

import 'react-dates/lib/css/_datepicker.css'

class RenderDatePicker extends Component {
  constructor() {
    super()

    this.state = {
      date: moment(),
      focused: false
    }
  }

  render() {
    const { input, meta, label } = this.props

    return (
      <div className='field'>
        <div className='control'>
          <label className='label'>{label}</label>
          <SingleDatePicker
            date={this.state.date}
            onDateChange={date => this.setState({ date })}
            isOutsideRange={() => false}
            focused={this.state.focused}
            onFocusChange={({ focused }) => this.setState({ focused })}
            initialVisibleMonth={() => moment().subtract(1, 'months')}
            showClearDate />
          <input className='is-hidden' {...input} value={this.state.date || ''} />
          {
            meta.error && meta.touched &&
              <p className='help is-danger'>{meta.error}</p>
          }
        </div>
      </div>
    )
  }
}

export default RenderDatePicker

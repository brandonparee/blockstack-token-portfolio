import React, { Component } from 'react'
import Flatpickr from 'react-flatpickr'

import 'flatpickr/dist/themes/light.css'

class RenderDateTimePicker extends Component {
  state = { date: new Date() }

  handleDateChange = (date) => {
    this.setState({ date })
    this.props.input.onChange(date[0])
  }

  render() {
    const { meta, label } = this.props

    return (
      <div className='field'>
        <div className='control'>
          <label className='label'>{label}</label>
          <Flatpickr
          options={{
            altInput: true,
            enableTime: true,
            maxDate: new Date()
          }}
          className='input'
            value={this.state.date}
            onChange={this.handleDateChange} />
          {
            meta.error && meta.touched &&
              <p className='help is-danger'>{meta.error}</p>
          }
        </div>
      </div>
    )
  }
}

export default RenderDateTimePicker

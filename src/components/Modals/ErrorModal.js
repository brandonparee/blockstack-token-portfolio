import React from 'react'
import { connect } from 'react-redux'
import Modal from 'react-modal'

import { modalStyle } from './ModalStyle'

const mapStateToProps = ({ file }) => {
  return {
    file
  }
}

const ErrorModal = ({ file }) => {
  return (
    <Modal
      isOpen={false}
      ariaHideApp={false}
      style={modalStyle} >
      <code>{file.error ? file.error.toString() : null}</code>
      <p className='is-text-4'>There was an issue loading data from Blockstack, please refresh the page and if necessary clear your cache.</p>
      <p className='is-text-4'>In some cases you may need to restart the Blockstack App.</p>
      <p>(Automatic error handling coming soon)</p>
    </Modal>
  )
}

export default connect(mapStateToProps)(ErrorModal)

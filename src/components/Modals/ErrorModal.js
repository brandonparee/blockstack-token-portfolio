import React from 'react'
import { connect } from 'react-redux'
import Modal from 'react-modal'

const mapStateToProps = ({ file }) => {
  return {
    file
  }
}

const ErrorModal = ({ file }) => {
  return (
    <Modal
      isOpen={file.error && !file.fileSetup ? true : false}
      ariaHideApp={false}>
      <code>{file.error ? file.error.toString() : null}</code>
      <p className='is-text-4'>There was an issue loading data from Blockstack, please refresh the page and if necessary clear your cache.</p>
      <p className="is-text-4">In some cases you may need to restart the Blockstack App.</p>
      <p>(Automatic error handling coming soon)</p>
    </Modal>
  )
}

export default connect(mapStateToProps)(ErrorModal)

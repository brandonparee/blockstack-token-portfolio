import React from 'react'
import { connect } from 'react-redux'
import Modal from 'react-modal'

import { closeTransactionModal } from '../../actions/transactionActions'
import { modalStyle } from './ModalStyle'

const mapStateToProps = ({ transactions }) => {
  return {
    isTransactionModalOpen: transactions.isTransactionModalOpen
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleCloseButton: () => {
      dispatch(closeTransactionModal())
    }
  }
}

const TransactionModal = ({ isTransactionModalOpen, handleCloseButton }) => {
  return (
    <Modal
      isOpen={isTransactionModalOpen}
      ariaHideApp={false}
      style={modalStyle}
      onRequestClose={handleCloseButton}
      >
      <p>Transaction added successfully!</p>
      <button className='button' onClick={() => handleCloseButton()}>Close</button>
    </Modal>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionModal)

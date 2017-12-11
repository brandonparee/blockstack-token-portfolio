import React from 'react'
import { connect } from 'react-redux'
import Modal from 'react-modal'

import { closeTransactionModal } from '../../actions/transactionActions'

const modalStyle = {
  overlay : {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(255, 255, 255, 0.75)'
  },
  content : {
    position                   : 'absolute',
    top                        : '33%',
    left                       : '33%',
    right                      : '33%',
    bottom                     : '33%',
    border                     : '1px solid #ccc',
    background                 : '#fff',
    overflow                   : 'auto',
    WebkitOverflowScrolling    : 'touch',
    borderRadius               : '4px',
    outline                    : 'none',
    padding                    : '20px'
  }
}

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

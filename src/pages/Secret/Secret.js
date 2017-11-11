import React from 'react'
import { getBlockstackFile, putBlockstackFile } from '../../actions/fileActions'
import { connect } from 'react-redux'

import Editor from '../../components/Editor/Editor'

const mapStateToProps = ({file, user}) => {
  return {
    file,
    user
  }
}

const mapDispatchToProps = (dispatch, nextProps) => {
  return {
    getFile: (path, decrypt) => {
      dispatch(getBlockstackFile(path, decrypt))
    },
    putFile: (path, content, encrypt) => {
      dispatch(putBlockstackFile(path, content, encrypt))
    }
  }
}

const Secret = ({user, file, getFile, putFile, ...rest}) => {
  return (
    <div>
      <h2>Super Secret!</h2>
      <p>This route is only accessible while logged in!</p>
      <hr />
      <p>These buttons will place 'Lorem Ipsum' into a file called 'test.txt'</p>
      <p>After pressing the putton try to do a 'Get File' for 'test.txt'!</p>
      <button className='button' onClick={() => putFile('test.txt', 'Lorem ipsum', true)}>Put Encrypted File</button>
      <button className='button' onClick={() => putFile('test.txt', 'Lorem ipsum')}>Put Unencrypted File</button>
      <hr />
      <Editor />
    </div>
  )
}

const SecretContainer = connect(mapStateToProps, mapDispatchToProps)(Secret)

export default SecretContainer

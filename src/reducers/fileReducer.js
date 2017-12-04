import {
  FETCH_FILE_ERROR,
  FETCH_FILE_REQUEST,
  FETCH_FILE_SUCCESS,
  PUT_FILE_ERROR,
  PUT_FILE_REQUEST,
  PUT_FILE_SUCCESS,
  FILE_REMOVE_ERRORS
} from '../actions/fileActions'

const initialState = {
  isFetching: false,
  isEncrypted: false,
  content: null,
  path: null,
  error: null
}

export const fileReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FILE_ERROR:
      return { ...state, isFetching: false, error: action.payload }
    case FETCH_FILE_REQUEST:
      return { ...state, isFetching: true }
    case FETCH_FILE_SUCCESS:
      return { ...state, isFetching: false, ...action.payload }
    case PUT_FILE_ERROR:
      return { ...state, isFetching: false, error: action.payload }
    case PUT_FILE_REQUEST:
      return { ...state, isFetching: true }
    case PUT_FILE_SUCCESS:
      return { ...state, isFetching: false, ...action.payload }
    case FILE_REMOVE_ERRORS:
      return { ...state, error: null }
    default:
      return state
  }
}

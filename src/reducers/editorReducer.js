import {
  EDITOR_FILE_PATH_CHANGE,
  EDITOR_FILE_CONTENT_CHANGE
} from '../actions/editorActions'

import {
  FETCH_FILE_SUCCESS,
  PUT_FILE_SUCCESS
} from '../actions/fileActions'

const initialState = {
  content: '',
  isEdited: false,
  path: ''
}

export const editorReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FILE_SUCCESS:
      return { isEdited: false, content: action.payload.content, path: action.payload.path }
    case PUT_FILE_SUCCESS:
      return { ...state, isEdited: false }
    case EDITOR_FILE_CONTENT_CHANGE:
      return { ...state, ...action.payload }
    case EDITOR_FILE_PATH_CHANGE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}

// ❗ You don't need to add extra reducers to achieve MVP
import { combineReducers } from 'redux'
import * as types from './action-types'


const initialWheelState = 0
function activeCog(wheelState = initialWheelState, action) {
  switch (action.type) {
    case types.MOVE_CLOCKWISE: {
      return ( wheelState !== 5 ? wheelState + 1 : 0);
    }
    case types.MOVE_COUNTERCLOCKWISE: {
      return ( wheelState !== 0 ? wheelState - 1 : 5);
    }
    default: 
      return wheelState;
  }
}

const initialQuizState = null
function quiz(quizState = initialQuizState, action) {
  switch (action.type) {
    case types.SET_QUIZ_INTO_STATE: {
      return (action.payload)
    }
    default:
      return quizState;
  }
}

const initialSelectedAnswerState = null
function selectedAnswer(answerState = initialSelectedAnswerState, action) {
  switch (action.type) {
    case types.SET_SELECTED_ANSWER: {
      const selectedAnswerId = action.payload;
      return selectedAnswerId;
    }
  }
  return answerState
}

const initialMessageState = ''
function infoMessage(infoMessageState = initialMessageState, action) {
  switch (action.type) {
    case types.SET_SELECTED_ANSWER: {
      return initialMessageState;
    }
    case types.SET_INFO_MESSAGE: {
      const message = action.payload;
      return message;
    }
    default:
      return infoMessageState;
  }
}

const initialFormState = {
  newQuestion: '',
  newTrueAnswer: '',
  newFalseAnswer: '',
}
function form(state = initialFormState, action) {
  return state
}

export default combineReducers({ activeCog, quiz, selectedAnswer, infoMessage, form })

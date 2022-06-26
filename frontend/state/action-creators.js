// ❗ You don't need to add extra action creators to achieve MVP

import axios from 'axios';
import * as types from './action-types';

const url = "http://localhost:9000/api/quiz/";

export function moveClockwise() {
  return {
    type: types.MOVE_CLOCKWISE
  }
}

export function moveCounterClockwise() {
  return {
    type: types.MOVE_COUNTERCLOCKWISE
  }
}

export function selectAnswer(answer_id) {
  return {
    type: types.SET_SELECTED_ANSWER,
    payload: answer_id
  }
}

export function setMessage(msg) {
  return {
    type: types.SET_INFO_MESSAGE,
    payload: msg
  }
}

export function setQuiz() { }

export function inputChange() { }

export function resetForm() { }

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    dispatch({ type: types.SET_QUIZ_INTO_STATE, payload: null})
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
    axios.get(url + 'next')
      .then(res => {
        const newQuiz = res.data
        dispatch({ type: types.SET_QUIZ_INTO_STATE, payload: newQuiz})
      })
      .catch(err => {
        debugger
      })
  }
}
export function postAnswer(answer) {
  return function (dispatch) {
    axios.post(url + 'answer', answer)
      .then(res => {
        const message = res.data.message;
        dispatch({ type: types.SET_QUIZ_INTO_STATE, payload: null})
        dispatch({ type: types.SET_INFO_MESSAGE, payload: message});
        axios.get(url + 'next')
          .then(res => {
            const newQuiz = res.data
            dispatch({ type: types.SET_QUIZ_INTO_STATE, payload: newQuiz})
          })
          .catch(err => {
            debugger
          })
        })
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
  }
}
export function postQuiz() {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state

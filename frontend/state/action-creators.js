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

export function inputChange({id, value}) {
  return {
    type: types.INPUT_CHANGE,
    payload: { id, value }
  }
}

export function resetForm() { }

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    dispatch({ type: types.SET_QUIZ_INTO_STATE, payload: null})
    axios.get(url + 'next')
      .then(res => {
        const newQuiz = res.data
        dispatch({ type: types.SET_QUIZ_INTO_STATE, payload: newQuiz})
      })
      .catch(err => {
        dispatch({ type: types.SET_INFO_MESSAGE, payload: err.message})
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
            dispatch({ type: types.SET_INFO_MESSAGE, payload: err.message})
            debugger
          })
        })
  }
}

export function postQuiz(newQuiz, successMessage) {
  return function (dispatch) {
    axios.post(url + 'new', newQuiz)
      .then(res => {
        dispatch({ type: types.SET_INFO_MESSAGE, payload: successMessage})
        dispatch({ type: types.RESET_FORM})
      })
      .catch(err => {
        dispatch({ type: types.SET_INFO_MESSAGE, payload: err.message})
        debugger
      })
  }
}
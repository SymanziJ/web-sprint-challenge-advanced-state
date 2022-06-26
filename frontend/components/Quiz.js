import React, {useEffect} from 'react'
import { connect } from 'react-redux';
import * as actions from '../state/action-creators'

export function Quiz(props) {
  const { quiz, fetchQuiz, selectAnswer, selectedAnswer, postAnswer, setMessage } = props;

  useEffect(() => {
    if (!quiz) {fetchQuiz()}
  },[])

  const handleSelect = (answer_id) => {
    setMessage('');
    selectAnswer(answer_id);
  }

  const handleSubmitAnswer = (e) => {
    e.preventDefault();
    postAnswer({"quiz_id": quiz.quiz_id, "answer_id": selectedAnswer});
  }

  return (
    <div id="wrapper">
      {
        quiz ? (
          <>
            <h2>{quiz.question}</h2>

            <div id="quizAnswers">
              {
                quiz.answers.map((answer, index) => {
                  return (
                    <div 
                      className={`answer${answer.answer_id === selectedAnswer ? " selected" : ""}`} 
                      key={index}
                    >
                      {quiz.answers[index].text}

                      <button onClick={() => handleSelect(answer.answer_id)}>
                        {answer.answer_id === selectedAnswer ? "SELECTED" : "Select"}
                      </button>
                    </div>
                  )
                })
              }
            </ div>

            <button
              id="submitAnswerBtn"
              type="submit" 
              onClick={handleSubmitAnswer} 
              disabled={selectedAnswer ? false : true}
            >
              Submit answer
            </button>
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
}

export default connect(st => st, actions)(Quiz);
import React, {useEffect} from 'react'
import { connect } from 'react-redux';
import * as actions from '../state/action-creators'

export function Quiz(props) {
  const { quiz, fetchQuiz, selectAnswer, selectedAnswer } = props;

  useEffect(() => {
    if (!quiz) {fetchQuiz();}
  },[])

  const handleSelect = (answer_id) => {
    selectAnswer(answer_id)
  }

  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
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

            <button id="submitAnswerBtn">Submit answer</button>
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
}

export default connect(st => st, actions)(Quiz);
import React, { useState, useEffect } from "react"

const Questions = () => {
  const [questions, setQuestions] = useState([])
  const [selectedOptions, setSelectedOptions] = useState([])
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [showResult, setShowResult] = useState(false)

  useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=5')
      .then(response => response.json())
      .then(data => {
        const formattedQuestions = data.results.map(question => {
          const options = [...question.incorrect_answers]
          const correctAnswerIndex = Math.floor(Math.random() * options.length)
          options.splice(correctAnswerIndex, 0, question.correct_answer)
          return {
            ...question,
            options,
            userAnswer: null,
          }
        })
        setQuestions(formattedQuestions)
      })
      .catch((error) => console.log(error))
  }, [])

  const handleOptionSelect = (questionIndex, optionIndex) => {
    setSelectedOptions(prevSelectedOptions => {
      const updatedSelectedOptions = [...prevSelectedOptions]
      updatedSelectedOptions[questionIndex] = optionIndex
      return updatedSelectedOptions
    })
  }

  const checkAnswers = () => {
    let score = 0
    const updatedQuestions = [...questions];
    updatedQuestions.forEach((question, index) => {
      const userAnswerIndex = selectedOptions[index]
      if (userAnswerIndex !== null) {
        const userAnswer = question.options[userAnswerIndex]
        const correctAnswer = question.correct_answer
        if (userAnswer === correctAnswer) {
          score++
        }
      }
    })
    setCorrectAnswers(score)
    setShowResult(true)
  }

  const renderOptions = (question, questionIndex) => {
    return (
      <div key={questionIndex} className="question-content">
        {question.options.map((option, optionIndex) => {
          const isSelected = selectedOptions[questionIndex] === optionIndex
            let backgroundColor
            let optionClass = "option-button"
            if (isSelected) {
                backgroundColor = "#D6DBF5"
            }
            if (showResult) {
                const isCorrectAnswer = option === question.correct_answer
                if (isCorrectAnswer) {
                    backgroundColor = "#94D7A2"
                }else if (isSelected && !isCorrectAnswer) {
                    backgroundColor = "#F8BCBC"
                }  
            }
          return (
              <div key={optionIndex} className="button">
                <button
                    key={optionIndex}
                    className={optionClass}
                    style={{backgroundColor}}
                    onClick={() => handleOptionSelect(questionIndex, optionIndex)}
                    disabled={showResult}
                >
                {option}
                </button>
            </div>
          )
        })}
      </div>
    )
  }

  const renderQuestions = () => {
    return questions.map((question, questionIndex) => (
      <div key={questionIndex}>
        <h3 className="question-title">{question.question}</h3>
        {renderOptions(question, questionIndex)}
      </div>
    ))
  }

  const renderResult = () => {
    return (
      <div className="check">
        <h2 className="question-check">You scored {correctAnswers}/5 correct answers</h2>
        <button 
            className="play-again" 
            onClick={() => window.location.reload()}
        >
            Play Again
        </button>
      </div>
    )
  }

  return (
    <div>
      {renderQuestions()}
      {!showResult && (
        <button 
            className="check-answer" 
            onClick={checkAnswers} 
            disabled={selectedOptions.includes(null)}
        >
          Check Answer
        </button>
      )}
      {showResult && renderResult()}
    </div>
  )
}

export default Questions
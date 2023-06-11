import React, { useState } from "react"
import Start from "./Start"
import Questions from "./Questions"

const App = () => {
  const [quizStarted, setQuizStarted] = useState(false)

  const handleStartQuiz = () => {
    setQuizStarted(true)
  }

  return (
    <div className="App">
      {!quizStarted && <Start onStartQuiz={handleStartQuiz} />}
      {quizStarted && <Questions />}
    </div>
  )
}

export default App
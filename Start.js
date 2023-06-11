import React from "react"

const Start = ({ onStartQuiz }) => {
    return (
        <div className="start-page">
            <h1 className="title">Quizzical</h1>
            <p className="description">
                Here is a quiz with 5 questions. Please hit start quiz below!
            </p>
            <button className="start-quiz" onClick={onStartQuiz}>Start quiz</button>
        </div>
    )
}

export default Start



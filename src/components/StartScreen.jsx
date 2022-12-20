import React from "react";

export default function StartScreen(props) {
  return (
    <section className="startQuiz">
      <h1 className="startQuiz__title">Quizzical</h1>
      <p className="startQuiz__description">Click Start Quiz to begin this funny adventure!</p>
      <button className="startQuiz__startButton" onClick={props.startGame}>Start Quiz</button>
    </section>
  )
}
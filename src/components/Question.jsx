import React from "react";
import { nanoid } from "nanoid";
import parse from "html-react-parser";

export default function Question(props) {
  // >>> Answers Elements Array
  const answersElements = props.answersArray.map(answer => {
    return <button 
      key={nanoid()} 
      value={answer} 
      onClick={props.selectAnswer}
      className={setClass(answer)}
      disabled={props.checked ? true:false}
    >
      {parse(answer)}</button>
  });

  // >>> Functions
  function setClass(answer) {
    if (props.checked) {
      if (answer === props.answerSelected) {
        return answer === props.correctAnswer ? 
        "answerButton rightAnswer" :
        "answerButton wrongAnswer";
      }
      else {
        return answer === props.correctAnswer ?
        "answerButton rightAnswer" :
        "answerButton";
      }
    }
    else {
      return props.answerSelected === answer ? "answerButton selected":"answerButton";
    }
  }

  return (
    <section className="questionSection">
      <h2 className="questionSection__title">{parse(props.question)}</h2>
      <section className="questionSection__buttons">
        {answersElements}
      </section>
      <hr></hr>
    </section>
  )
}
import React from "react";
import { nanoid } from "nanoid";
import Question from "./Question.jsx";

export default function Quiz() {
  // >>> States
  const [questions, setQuestions] = React.useState([]);
  const [checked, setChecked] = React.useState(false);
  const [selectedAnswers, setSelectedAnswers] = React.useState([]);
  const [rightAnswers, setRightAnswers] = React.useState(0);
  const [randomAnswersArray, setRandomAnswersArray] = React.useState([]);

  // >>> API call
  React.useEffect(() => {
    getQuestions();
  }, []);

  // >>> Questions Elements Array
  const questionsElements = questions.map((question, index) => {
    return <Question 
      key={nanoid()} 
      question={question.question} 
      correctAnswer={question.correct_answer}
      answersArray={randomAnswersArray[index]}
      selectAnswer={(event) => selectAnswer(event, index)}
      answerSelected={selectedAnswers[index]}
      checked={checked}
    />
  });

  // >>> Functions
  function getQuestions() {
    fetch("https://opentdb.com/api.php?amount=5&category=31&type=multiple")
    .then(res => res.json())
    .then(obj => {
      setQuestions(obj.results);
      setRandomAnswersArray([]);

      // Randomizind Answers
      for (let i = 0; i < obj.results.length; i++) {
        const question = obj.results[i],
        arrayOfAnswers = [question.correct_answer, ...question.incorrect_answers];

        for (let j = 0; j < arrayOfAnswers.length; j++) {
          let randomPos = Math.floor(Math.random() * arrayOfAnswers.length);
          let temp = arrayOfAnswers[j];
          arrayOfAnswers[j] = arrayOfAnswers[randomPos];
          arrayOfAnswers[randomPos] = temp;
        }
  
        setRandomAnswersArray(oldAnswers => [...oldAnswers, arrayOfAnswers]);
      }
    });
  }

  function checkAnswers() {
    if (selectedAnswers.length < 5) {
      alert("Please select an answer for each question");
      return;
    }

    selectedAnswers.forEach((answer, index) => {
      if (answer === questions[index].correct_answer) {
        setRightAnswers(oldRightAnswers => oldRightAnswers + 1);
      }
    });

    setChecked(oldChecked => !oldChecked);
  }

  function selectAnswer(event, index) {
    const selected = event.target;
    setSelectedAnswers(oldAnswers => {
      const newAnswers = [...oldAnswers];
      newAnswers[index] = selected.value;
      return newAnswers;
    });
  }

  function playAgain() {
    setRightAnswers(0);
    setSelectedAnswers([]);
    setChecked(false);
    getQuestions();
  }

  return (
    <section className="quiz">
      {questionsElements}
      <div className="quizEnd">
        {
          checked ?
          <div className="quizResult">
            <p>You scored {rightAnswers}/5 correct answers</p>
            <button onClick={playAgain} className="quizButton">Play Again</button>
          </div>
          :
          <button onClick={checkAnswers} className="quizButton">Check Answers</button>
        }
      </div>
    </section>
  )
}
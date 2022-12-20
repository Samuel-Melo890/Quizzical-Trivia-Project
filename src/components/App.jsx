import React from 'react';
import StartScreen from "./StartScreen.jsx";
import Quiz from "./Quiz.jsx";

export default function App() {
  // >>> States
  const [running, setRunning] = React.useState(false);

  // >>> Functions
  function startGame() {
    setRunning(oldRunning => !oldRunning);
  }

  return (
    <section>
      {!running && <StartScreen startGame={startGame}/>}
      {running && <Quiz />}
      <img className="blob" id="blob1" src="./assets/blob1.png" alt="Blob 1"/>
      <img className="blob" id="blob2" src="./assets/blob2.png" alt="Blob 2"/>
    </section>
  )
}
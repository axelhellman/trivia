import React from "react";
import Trivia from "./Trivia";

const TriviaElements = ({ options, answerClick }) =>
  options.map((arr, i) => (
    <Trivia
      key={i}
      id={options[i].id}
      answer_options={arr.answerOptions}
      answerClick={answerClick}
      question={options[i].question}
      questionID={arr.id}
      disabled={arr.disabled}
    />
  ));

export default TriviaElements;

import React from 'react';


function Trivia(props) {
/*
      const answerElements = <div className="trivia--answer_button">
      {props.answer_options.map((item, i) => <button className="trivia--answer_options_true"  key={i} id={props.questionID} value={item.answer} hold={item.hold} disabled={item.disabled} onClick={props.answerClick} >{item.answer}</button>)}
      </div>
        //<h1 key={i}>{element}</h1>

  const ele = props.incorrect_answers.forEach((e, index) => {
    return <button className="trivia--answer_options">{e} </button>
  })
  console.log(ele) */

  return(
    <div className="trivia--component">
      <div className="trivia--question">
      <h2>{props.question.replace(/&quot;/g,'"').replace(/&#039;/g, "'")
      .replace(/&amp;/g, "&").replace(/&rsquo;/g, "").replace(/&ouml/g, "ö")}</h2>
      </div>
      <div className="trivia--answer_button">
      {props.answer_options.map((item, i) => <button
        className={item.className}
        key={i} id={props.questionID}
        value={item.isCorrect}
        disabled={item.disabled}
        name={item.answer} onClick={props.answerClick}>
        {item.answer.replace(/&quot;/g,'"').replace(/&#039;/g, "'").replace(/&amp;/g, "&").replace(/&rsquo;/g, "").replace(/&ouml/g, "ö") }
      </button>)}
      </div>
      <br></br>

    </div>

  )
} export default Trivia;

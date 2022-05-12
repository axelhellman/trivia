
import React from 'react';
import Select from 'react-select';


function StartTrivia(props) {

  return(
    <div className="start--container">
      <h1 className="start--title"> Test your knowledge in: </h1>
      <h3 className="start--info"> Select Topic: </h3>
      <Select
        onChange={props.selectedCategory}
        options={props.topics}
      />
      <button className="start--button" onClick={props.startTrivia}> Start Quiz </button>
    </div>
  )
} export default StartTrivia;

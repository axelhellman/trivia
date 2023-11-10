import React from "react";
import Select from "react-select";

function StartTrivia(props) {
  return (
    <div className="start--container">
      <h1 className="start--title"> New Title Text </h1>
      <Select
        placeholder={"Select Your Topic"}
        onChange={props.selectedCategory}
        options={props.topics}
      />
      <button className="start--button" onClick={props.startTrivia}>
        {" "}
        Start Quiz{" "}
      </button>
    </div>
  );
}
export default StartTrivia;

import React from 'react'
import TriviaElements from './components/TriviaElements'
import CategoryElements from './components/CategoryElements'
function App() {

  const [correct, setCorrect] = React.useState([])
  const [options, setOptions] = React.useState([])
  const [start, setStart] = React.useState(true)
  const [checkedAnswers, setCheckedAnswers] = React.useState([])
  const [score, setScore] = React.useState()
  const [playAgain, setPlayAgain] = React.useState(false)
  const [topics, setTopics] = React.useState([])
  const [category, setCategory] = React.useState()

  //currently a race condition
  React.useEffect(() => {
    let dataFetched = true;
    async function getTopics() {
      const res = await fetch("https://opentdb.com/api_category.php")
      const result = await res.json()
      const data_array = []
      data_array.push({
        value: "Mixed",
        label: "Mixed",
      })
      for (let i = 0; i <result.trivia_categories.length; i++){
        const newTop = {
          value: result.trivia_categories[i].name,
          label: result.trivia_categories[i].name,
          id: result.trivia_categories[i].id,
        }
        data_array.push(newTop)
      }
      if (dataFetched) {
        setTopics(data_array)
      }
    }
    getTopics()
    return () => {
      dataFetched = false;
    }
    //avoid race condition
  return (
    <div className="App">
      {start ? <div><CategoryElements startTrivia={startTrivia} topics={topics} selectedCategory={selectedCategory} /></div> :
      <div>
        <TriviaElements options={options} answerClick={answerClick} />
        {!score ? <div className="playagain--component">
        <button className="start--button" onClick={scoreCheck}> Check Answers </button></div> :
        <div className="playagain--component">
          <button className="playagain--button" onClick={restartGame}> Play Again </button>
          <div className="score"> Your score: {score.length}/{correct.length} </div>
          <button className="playagain--button" onClick={changeTopic}> Change Topic </button>
        </div>}
      </div>}
    </div>
  )
}

  }, [start])
export default App;

    React.useEffect(() => {
      let dataFetched= true;

      async function getTrivia() {
        const api_address =  category ? ("https://opentdb.com/api.php?amount=10"+category) :  ("https://opentdb.com/api.php?amount=10")
        console.log(api_address)
        const res = await fetch(api_address)
        const data = await res.json()

        if(dataFetched && data.response_code === 0){
          console.log(1)
          setOptions(data.results.map((item, index)=>({
            //set anser, question_id, isCorrect, disabled, className, also merges incorrect_answers and correct_answer to a single array. Then shuffle it the array
            // NOTE TO SELF: one-liners like these are ugly
            id:index+1, question:item.question, answerOptions:item.incorrect_answers.map(answer =>
              ({answer:answer, question_id:index+1, isCorrect:false, disabled:false, className:"trivia--answer_options_default"})).concat({answer:item.correct_answer, question_id:index+1, isCorrect:true, disabled:false, className:"trivia--answer_options_default"}).sort(() => Math.random() - 0.5)})))
          setCorrect(data.results.map((item, index) => ({answer:item.correct_answer, id:index+1})))
        }
      }
      !start && getTrivia()
      return () => dataFetched = false;
    }, [start, category, playAgain])


      function startTrivia(selectedTopic){
        setStart(!start)
      }
    React.useEffect(() => {

      setOptions(prevState => {
              return prevState.map((option) => {
                  return {...option,
                    answerOptions: option.answerOptions.map(answer => (answer.isCorrect === true ? {
                      ...answer, className : "trivia--answer_options_true", disabled:false} : answer)),
                  }
              })
          })


          setOptions(prevState => {
                  return prevState.map((option) => {
                      return {...option,
                        answerOptions: option.answerOptions.map(answer => (answer.disabled === false && answer.isCorrect === false ? {
                          ...answer, className : "trivia--answer_options_false", disabled:true} : answer)),
                      }
                  })
              })

    }, [score]
   )
   // TODO: implement helper function.
   /*
   function setOptionHelper(){

     return setOptions(prevState => {
             return prevState.map((option) => {
                 return {...option,
                   answerOptions: option.answerOptions.map(answer => (answer.disabled === false && answer.isCorrect === false ? {
                     ...answer, className : "trivia--answer_options_false", disabled:true} : answer)),
                 }
             })
         })
   }
   */
    function answerClick(e) {
      if(!score){
      setOptions(prevState => {
              return prevState.map((option) => {
                  return option.id === parseInt(e.target.id) ?  {...option,
                    answerOptions: option.answerOptions.map(answer => (answer.answer !== (e.target.name) ? {
                      ...answer, disabled : !answer.disabled, className:"trivia--answer_options_default"} :
                      {...answer, className:"trivia--answer_options_selected"})),
                  }: option
              })
          })

        const arr = checkedAnswers

        if (arr.find(element => element.id === e.target.id)){
          const result =arr.filter(element => element.id !== e.target.id)
          setCheckedAnswers(result)
          setOptions(prevState => {
                  return prevState.map((option) => {
                      return option.id === parseInt(e.target.id) ?  {...option,
                        answerOptions: option.answerOptions.map(answer => (answer.answer === (e.target.name) ? {
                          ...answer, className:"trivia--answer_options_default"} : answer)),
                      }: option
                  })
              })
        } else{
          arr.push({isCorrect: e.target.value, answer:e.target.name, id: e.target.id})
          setCheckedAnswers(arr)
        }
      }
      }

    function scoreCheck(){
      if(checkedAnswers.length === 10 ){
      setScore(checkedAnswers.filter(isCorrect => isCorrect.isCorrect === 'true').map(answer => answer))

      } else{
      alert("need to answer all QUESTIONS ")
      }
    }

    function restartGame(e){
      e.preventDefault()
      setPlayAgain(!playAgain)
      setScore()
      setCheckedAnswers([])
      setOptions([])
    }
    function changeTopic(){
      setPlayAgain(!playAgain)
      setScore()
      setCheckedAnswers([])
      setOptions([])
      setStart(!start)
    }
    <div className="App">
      {start ? <div>{categoryElements}</div> :
      <div>
        {triviaElements}
        {!score ? <div className="playagain--component">
        <button className="start--button" onClick={scoreCheck}> Check Answers </button></div> :
        <div className="playagain--component">
          <button className="playagain--button" onClick={restartGame}> Play Again </button>
          <div className="score"> Your score: {score.length}/{correct.length} </div>
          <button className="playagain--button" onClick={changeTopic}> Change Topic </button>
        </div>}
      </div>}
    </div>
  )
}

export default App;

import React, { useState, useEffect } from 'react';
import Questions from './Questions';
import './../assets/styles.scss'

export default function ParentComponent(){
  // const [isParentData, setIsParentData] = useState(['original']);
  const [questions, setQuestions] = useState();
  const [start, setStart] = useState(false)
  async function letStart() {
    
    const res = await fetch("https://opentdb.com/api.php?amount=5&category=32&type=multiple&encode=base64")
    const data = await res.json()
    setQuestions([...data.results])
    setStart(true)
  
  }

  function setIs(el){
    setQuestions([...el])
  }

  function select(el, select, parentId){
    el.map(questions => {
      console.log(questions.id , parentId)
      if(questions.id === parentId){
        if(questions.selected === select){
          return questions.selected = ''
        }
        else{
          return questions.selected = select
        }
        
      }else{
        return {...questions}
      }
    })
    console.log('el', el)
    setQuestions(el)
  }

  return (
    <div className='welcome'>
      {
        !start 
        &&
        <div>
          <p>Welcome to Quizzard!</p>
          <button onClick={letStart}>Start</button>
        </div>
      }
      <Questions questions={questions} sendToParent={setIs} select={select} />
    </div>
  );
}
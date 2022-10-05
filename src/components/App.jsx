import React, { useState, useEffect } from 'react';
import Questions from './Questions';
import './../assets/styles.scss'

export default function ParentComponent(){
  const [questions, setQuestions] = useState()
  const [start, setStart] = useState(false)
  const [completeAnswer, setCompleteAnswer] = useState(Number(0))
  const [score, setScore] = useState(Number(0))

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
    setQuestions(el)
  }

  function check(el){
    console.log('checking')
    console.log(completeAnswer)
    let scoore = 0

      // Evaluate answers
      el.map(questions => {
        if(questions.selected === questions.correct_answer){
          console.log('update', scoore)
          scoore++
        }
      })
    
      //NaN issue with the score will be nack

      console.log('ended', Number(scoore))

  }

  return (
    <div className='welcome'>
      {
        !start 
        &&
        <div className='landing'>
          <p className='brand'>Welcome to Quizzard!</p>
          <p>Let's try your Cartoon Network & Animations knowledge!</p>
          <button onClick={letStart}>Start</button>
        </div>
        ||
        <Questions questions={questions} sendToParent={setIs} select={select} check={check} />
      }
      
    </div>
  );
}
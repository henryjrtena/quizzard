import React, { useState, useEffect } from 'react';
import Questions from './Questions';
import './../assets/styles.scss'
import { nanoid } from 'nanoid';

export default function ParentComponent(){
  const [questions, setQuestions] = useState()
  const [start, setStart] = useState(false)

  const [doneAnswering, setDoneAnswering] = useState(false)
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
          setCompleteAnswer(prev => Number(prev) - 1)
          return questions.selected = ''
        }
        else{
          setCompleteAnswer(prev => Number(prev) + 1)
          return questions.selected = select
        }
        
      }else{
        
        return {...questions}
      }
    })
    setQuestions(el)
  }

  function check(el){
    console.log('Checking')
    if(Number(completeAnswer) === 5){

      // Evaluate answers
      let scoreX = 0
      el.map(questions => {
        if(questions.selected === questions.correct_answer){
          scoreX++
        }
      })

      setScore(scoreX)
      questions['done'] = true
    }
    console.log('Your score  is ', Number(score))
    console.log('End Checking')
    setDoneAnswering(true)
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
      {
        doneAnswering && <p key={nanoid()}>Your score is {Number(score)}/5</p>
      }
      
    </div>
  );
}
import React from 'react';
import {nanoid} from 'nanoid'
import shuffle from './Functions';
import Buttons from './Buttons'

export default function Questions({questions, select}){
  
  const newQuestions = questions?.map(questions=>{
    if(!questions.options){
      const options = shuffle([...questions.incorrect_answers, questions.correct_answer])
      return { ...questions, selected : '' , id : nanoid(), options: options}
    }
    else{
      return { ...questions, selected: questions.selected}
    }
  })

  const element = newQuestions?.map(questions=>{
    const optionsElements = questions.options.map(option => {
      return <Buttons key={nanoid()} newQuestions={newQuestions} active={questions.selected} select={select} questionsId={questions.id} option={option} />
    })

    return (
      <div key={nanoid()} className="question">
        <div className="text">
          <p key={nanoid()}>{atob(questions.question)}</p>
        </div>
        <div className='options' key={nanoid()}>
          {optionsElements}
        </div> 
      </div>
    )
  })

  return (
    <div className='questions'>
      {element}
    </div>
  )
}
import React from 'react';
import {nanoid} from 'nanoid'
import shuffle from './Functions';
import Buttons from './Buttons'

export default function Questions({questions, select, check}){

    // // let newObj = options
    // let tempObj = false
    // console.log('list question',questions)
    // newObj = questions.map(question => {
      
    //   const x = {
    //     parentId: question.id,
    //     name: question.correct_answer,
    //     isCorrect: true,
    //     isHeld: false
    //   }
    //   return x
    // })
  const newQuestions = questions?.map(questions=>{
    if(!questions.options){
      const options = shuffle([...questions.incorrect_answers, questions.correct_answer])
      

      const newObj = options.map(option => {
        if(option === questions.correct_answer){
            return {
              name: questions.correct_answer,
              isCorrect: true,
              isHeld: false
            }
        }
        else{
            return {
                name: questions.incorrect_answers,
                isCorrect: false,
                isHeld: false
            }
        }
      })
      
      return { ...questions, selected : '' , id : nanoid(), options: options, done: false, optionStatus: newObj} 
    }
    else{
      return { ...questions, selected: questions.selected}
    }
  })

  console.log('New Questions:', newQuestions)


  const element = newQuestions?.map(questions=>{
    const optionsElements = questions.options.map(option => {
      return <Buttons key={nanoid()} newQuestions={newQuestions} correct={questions.correct_answer} active={questions.selected} select={select} questionsId={questions.id} option={option} />
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
      <div className='selection'>
        <button onClick={()=>{check(newQuestions)}}>Check answers</button>
      </div>
    </div>
  )
}
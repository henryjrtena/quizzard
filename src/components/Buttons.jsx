import React from 'react'
import { nanoid } from 'nanoid'

/**
 * 
 * @param {current option, fullQuestion, parentId,  function select(), isActive, isCorrect} param0 
 * @returns 
 */
export default function Buttons ({option, newQuestions, questionsId, select, active, correct}) {
    let styles
    if(option === active){
        styles = {
            backgroundColor: "#4D5B9E",
            color: "#F5F7FB"
        }
    }
    let isCorrect
    if(newQuestions.done){
        if(correct === active){
            isCorrect = 'correct'
        }
        else{
            isCorrect = 'wrong'
        }
    }

    return <button style={styles} key={nanoid()} onClick={()=>{select(newQuestions, option, questionsId)}} value={atob(option)} className={`option--button ${isCorrect}`}>{atob(option)}</button>
}
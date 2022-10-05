import React from 'react'
import { nanoid } from 'nanoid'

export default function Buttons ({option, newQuestions, questionsId, select, active}) {
    let styles
    if(option === active){
        styles = {
            backgroundColor: "#4D5B9E",
            color: "#F5F7FB"
        }
    }
    //console.log("option: ", option , "active: ", active)
    return <button style={styles} key={nanoid()} onClick={()=>{select(newQuestions, option, questionsId)}} value={atob(option)} className={`option--button`}>{atob(option)}</button>
}
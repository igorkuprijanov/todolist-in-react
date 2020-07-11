import React from 'react'
import './App.css'


function ToDoItem(props){
    
    
    return(
    <div id='todoitemmain'>
       <div id="text">
        <input type="checkbox" checked={props.item.isDone}  onChange = {(event) => props.handleChange(props.item.id)}></input>
        <p>{props.item.text}</p>
        </div>
        <div id='buttons'>
        <button onClick = {(event) => props.editButton(props.item.id)}>Edit</button>
        <button onClick = {(event) => props.deleteButton(props.item.id)}>Delete</button>
        </div>
    </div>
    )
}

export default ToDoItem;
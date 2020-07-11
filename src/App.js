import React from 'react'
import './App.css'
import ToDoItem from './ToDoItem.js'
import Editable from './editable.js'

let toDoData = JSON.parse(localStorage.getItem('tasks') || "[]")

class App extends React.Component{
   constructor(){
       super()
       this.addNew = this.addNew.bind(this)
    this.handleChange = this.handleChange.bind(this)
       this.pressEnter = this.pressEnter.bind(this)
       this.allVisible = this.allVisible.bind(this)
       this.activeVisible = this.activeVisible.bind(this)
       this.completedVisible = this.completedVisible.bind(this)
       this.deleteButton = this.deleteButton.bind(this)
       this.editButton = this.editButton.bind(this)
       
       this.state = {
           items: toDoData.map(item => 
    <ToDoItem className="todoitem" item={item} key={item.id} checked ={item.isDone} handleChange={this.handleChange} deleteButton = {this.deleteButton} editButton = {this.editButton}/>),
            all: true,
            active: false,
            completed: false
            
       }
   }  
       
    addNew(){
            if(document.getElementById('input').value){
            toDoData.push({
                id: toDoData.length+1,
                text: document.getElementById('input').value.toUpperCase(),
                isDone: false
            })
            this.show()
            }
        document.getElementById('input').value=""
        localStorage.setItem("tasks", JSON.stringify(toDoData))
       }
        
  handleChange(id){
      for(let i = 0; i<toDoData.length; i++){
          if(toDoData[i].id === id){
              toDoData[i].isDone = !toDoData[i].isDone
              localStorage.setItem("tasks", JSON.stringify(toDoData))
              console.log(id)
          }
      }
      this.show()
    }
                    
    pressEnter(e){
          if(e.key === "Enter"){
              this.addNew()
              console.log('asscheeks on enter key')
          }
      }
      
    allVisible(){
       this.setState({
           items: toDoData.map(item => 
    <ToDoItem className="todoitem" item={item} key={item.id} checked ={item.isDone} handleChange={this.handleChange} deleteButton = {this.deleteButton} editButton = {this.editButton}/>),
           all: true,
           active: false,
           completed: false
       })
    }
      
    activeVisible(){
        this.setState({
        items: (toDoData.filter((item) =>!item.isDone)).map(item => 
    <ToDoItem className="todoitem" item={item} key={item.id} checked ={item.isDone} handleChange={this.handleChange} deleteButton = {this.deleteButton} editButton = {this.editButton}/>),
           all: false,
           active: true,
           completed: false
       })
    }
      completedVisible(){
          this.setState({
              items: (toDoData.filter((item) =>item.isDone)).map(item => 
    <ToDoItem className="todoitem" item={item} key={item.id} checked ={item.isDone} handleChange={this.handleChange} deleteButton = {this.deleteButton} editButton = {this.editButton}/>),
           all: false,
           active: false,
           completed: true
       })
      }
    
    deleteButton(id){
              for(let i = 0; i<toDoData.length; i++){
                  if(toDoData[i].id === id){
                      toDoData.splice(i, 1)
                  }
              }
              this.show()
              localStorage.setItem("tasks", JSON.stringify(toDoData))
          }
            
    show(){
              if(this.state.all){
                  this.setState({
                items: toDoData.map(item => 
    <ToDoItem className="todoitem" item={item} key={item.id} checked ={item.isDone} handleChange={this.handleChange} deleteButton = {this.deleteButton} editButton = {this.editButton}/>)
            })
              }else if(this.state.active){
                      this.setState({
        items: (toDoData.filter((item) =>!item.isDone)).map(item => 
    <ToDoItem className="todoitem" item={item} key={item.id} checked ={item.isDone} handleChange={this.handleChange} deleteButton = {this.deleteButton} editButton = {this.editButton}/>)
       })
                  }else{
                           this.setState({
              items: (toDoData.filter((item) =>item.isDone)).map(item => 
    <ToDoItem className="todoitem" item={item} key={item.id} checked ={item.isDone} handleChange={this.handleChange} deleteButton = {this.deleteButton} editButton = {this.editButton}/>)
        })
                                    }
              }
        
    editButton(id){
        for(let i = 0; i<toDoData.length; i++){
            if(toDoData[i].id === id){
                toDoData[i].text = prompt('Enter new task:', toDoData[i].text)
            }
        }
        localStorage.setItem("tasks", JSON.stringify(toDoData))
        this.show()
        console.log('cunt', id)
    }
          
              
    render(){
    return(
    <div id='main'>
      <div id="head">
       <h1>Todo List</h1>
       <h3>What's in plan?</h3>
       <input id='input' onKeyDown = {(e) => this.pressEnter(e)}></input>
       <button class="button-primary" onClick = {this.addNew}>Add</button>
       </div>
       <div id='filters'>
           <button id='allbutton' onClick={this.allVisible} style={this.state.all ? {background: "#f6f6f6"} : {background: "white"}}>All</button>
           
           <button id='activebutton' onClick = {this.activeVisible} style={this.state.active ? {background: "#f6f6f6"} : {background: "white"}}>Active</button>
           
           <button id='completedbutton' onClick ={this.completedVisible} style={this.state.completed ? {background: "#f6f6f6"} : {background: "white"}}>Completed</button>
           
       </div>
       <div id='remain'>
       <p>{this.state.items.length} tasks remaining</p>
       </div>
       <div id='todos'>
        {this.state.items}
        </div>
    </div>
    )
    }
}

export default App;
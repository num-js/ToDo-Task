import React, { Component } from 'react';
import './App.css';
import FlipMove from 'react-flip-move';

export default class App extends Component {

    state = {
        currentTodo: '',
        allTodos: [
            {
                _id: 1,
                todo: 'Loading Todos...'
            }
        ]
    }

    inputHandeler = (event) => {
        this.setState({
            currentTodo: event.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        
        fetch('/api/addTodo', {
            method : 'POST',
            body : JSON.stringify({"todoItem": this.state.currentTodo}),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .then(res2 => {
            this.setState({
                allTodos: [res2, ...this.state.allTodos],
                currentTodo: ''
            })
        });
    }

    componentDidMount(){
        fetch('/api/getAllTodos')
            .then(res=> res.json())
            .then(res2 => {
                this.setState({
                    allTodos: res2
                })
            })
    }

   

    deleteTodo = (id) => {
        fetch('/api/deleteTodo/'+id, {
            method: 'delete'
        }).then(res=>res.json())
        .then(res2=>{
            const freshTodos = this.state.allTodos.filter(singleTodo => {
                return singleTodo._id !== res2._id
            })
            this.setState({
                allTodos: freshTodos
            })
        })
    }

    render() {
        const todoList = this.state.allTodos.map(singleTodo => {
            return (
                <div className="list" key={singleTodo._id}>
                    <p className="shadow hoverable">
                        <div>{singleTodo.todo}</div>
                        <span style={{margin: '-5px'}} className="deleteIcon fa fa-trash" onClick={() => this.deleteTodo(singleTodo._id)}></span>
                    </p>
                </div>

                
            )
        })

        return (
            <>
                <div className="container appContainer col-lg-3 col-md-8 col-sm-12 shadow" align="center">
                    <div className="secJumbotron shadow">
                        <form id="to-do-form" onSubmit={(event)=>this.handleSubmit(event)}>
                            <input type="text" className="shadow" placeholder="ToDos..." title="Enter ToDos" required
                                name="todoItem"
                                value={this.state.currentTodo}
                                onChange={(event)=>{this.setState({currentTodo: event.target.value})}}
                            />
                            <button className="shadow" type="submit"><span className="fa fa-plus"></span> Add</button>
                        </form>
                        <hr style={{margin: '-5px'}} />

                        <div>
                            <FlipMove>
                                {todoList}
                            </FlipMove>
                        </div>
                        <br/>
                    </div>
                </div>
            </>
        );
    }
}


const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

    //Get All Todos
router.get('/getAllTodos', (req, res) => {
    todoModel.find({})
        .sort({ _id: -1 })
        .then((allTodos) => res.json(allTodos));
});

//Todo Model
const todoModel = mongoose.model('todos');


    // Add Todo
router.post('/addTodo', (req, res) => {
    if(req.body.todoItem){
        const newTodo = new todoModel({
            todo: req.body.todoItem
        });

        newTodo
            .save()
            .then((todo) => res.json(todo));
    }else{
        console.log("Please Insert Todo");
    }
});

    //Delete Todo
router.delete('/deleteTodo/:id', (req, res)=>{
    todoModel.findByIdAndRemove(req.params.id)
        .then((deletedTodo) => res.json(deletedTodo))
        .catch((err)=> res.json({success: false}).status(404))
});


module.exports = router;
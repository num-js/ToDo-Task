const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

    //Get All Todos
router.get('/', (req, res) => {
    todoModel.find({})
        .sort({ _id: -1 })
        .then((allTodos) => res.render('index', {allTodos: allTodos}))
        
});
 
//Todo Model
const todoModel = mongoose.model('todos');


    // Add Todo
router.post('/', (req, res) => {
    if(req.body.todoItem !== ''){
        const newTodo = new todoModel({
            todo: req.body.todoItem
        });

        newTodo
            .save()
            .then((todo) => res.json(todo));
    }
});

    //Delete Todo
router.delete('/remove/:id', (req, res)=>{
    todoModel.findByIdAndRemove(req.params.id)
        .then(()=> res.json({success: true}))
        .catch((err)=> res.json({success: false}).status(404))
});


module.exports = router;
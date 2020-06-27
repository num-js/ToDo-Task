const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    todo: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

mongoose.model('todos', todoSchema);
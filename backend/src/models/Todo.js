const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title : {type : String, required : true},
    description : {type : String, default : null},
    important : {type : Boolean, default : false},
    dueDate : { type: String, default: null },
    completed : {type : Boolean, default : false},
    userId : {type : mongoose.Schema.Types.ObjectId,ref : 'User', required : true}
}, { timestamps: true });

module.exports = mongoose.model('Todo', todoSchema);
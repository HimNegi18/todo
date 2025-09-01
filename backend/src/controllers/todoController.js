const Todo = require("../models/Todo");

exports.createTodo = async (req, res) => {
  try {
    const { title, description,dueDate, important, completed } = req.body;
    const userId = req.user.id;
    console.log(userId);

    if (!title || !userId) {
      return res.status(400).json({ error: "Data are required" });
    }

    const todo = await Todo.create({
      title,
      description,
      dueDate,
      important,
      completed,
      userId,
    });

    const { userId: _, ...todoData } = todo.toObject();
    res.status(201).json(todoData);
  } catch (error) {
    res.status(500).json({ error: "Failed to create a todo" });
  }
};

exports.getTodo = async (req, res) => {
  try {
    const todos = await Todo.find({ userId : req.user.id});
    res.status(200).json(todos);
  } catch (error) {
    console.error("Get Todos Error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.updateTodo = async (req, res)=>{
  const {id} = req.params;
  const userId = req.user.id;
  const update = req.body;
  try {
    const todo = await Todo.findOneAndUpdate(
      {_id : id , userId},
      update,
      {new: true}
    )

    if (!todo) {
     return res.status(403).json({ error: 'forbidden not your todos'});
    }

    res.json(todo);  
  } catch (error) {
    console.error("Update error:", error.message);
    res.status(500).json({error: 'server error'});
  }
}

exports.deleteTodo = async (req, res)=>{
  const { id } = req.params;
  const userId = req.user.id;
  try {
    const deleted = await Todo.findOneAndDelete(
      { _id : id , userId}
    )

    if(!deleted){
      return res.status(403).json({ error : "Forbidden: You cannot delete this item"});
    }

    res.json({message : "Todo deleted successfully"});
    
  } catch (error) {
    console.error("Delete error:", error.message);
    res.status(500).json({error: "server error"});
  }
}
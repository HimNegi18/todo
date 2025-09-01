import React, { useState } from "react";
import api from "../../utils/api";

const TodoItem = ({todoItem, setTodo, setShowTodoItem}) => {

  const [item, setItem] = useState(todoItem);
  
  const handleChange = (e)=>{
    const name = e.target.name;
    const value = e.target.value;

    setItem( prev =>( { ...prev, [name]: value}));  
  }

  const handleDelete = async(id)=>{
    try {
      const res = await api.delete(`/api/delete-todo/${id}`);
      setTodo((prev) => prev.filter(todo => todo._id !== id))
      setShowTodoItem(false);

    } catch (error) {
      console.error("Failed to update :", error);
    }
  }

  const handleUpdate = async(id)=>{
    try {
      const res = await api.put(`/api/update-todo/${id}`,{
        title : item.title,
        description : item.description
      })
      setTodo((prevTodo) =>
          prevTodo.map((todo) =>
            todo._id === id ? res.data : todo
          )
        );
        setShowTodoItem(false)
    } catch (error) {
      console.error("Failed to update :", error);
    }
  }
  
  return (
    <div className="absolute  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] sm:w-[75%] lg:w-[30%] h-[350px] rounded-sm bg-[#181818] px-8.5 py-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-3xl font-bold">Todo</h1>
        <button onClick={()=>setShowTodoItem(false)}>X</button>
      </div>
      <form>
        <input
          type="text"
          name="title"
          title="Title"
          placeholder="Title"
          onChange={handleChange}
          value={item.title || ''}
          className="focus:outline-none px-3.5 py-3 w-full rounded-sm mb-4 bg-[#252423]"
        />
        <textarea
          rows={3}
          name="description"
          title="description"
          placeholder="Description"
          onChange={handleChange}
          value={item.description || ''}
          className="focus:outline-none px-3.5 py-3 w-full rounded-sm max-h-[100px] mb-3 bg-[#252423]"
        />
      </form>
      <div className="flex justify-between">
        <button className="border rounded-sm px-4 py-2" onClick={()=> handleDelete(item._id)}>Delete</button>
        <button className="border rounded-sm px-4 py-2" onClick={()=> handleUpdate(item._id)}>Update</button>
      </div>
    </div>
  );
};

export default TodoItem;

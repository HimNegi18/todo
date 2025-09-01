import React, { useContext, useState } from "react";
import Title from "../../component/Title/Title";
import { GoHome } from "react-icons/go";
import AddTask from "../../component/AddTask/AddTask";
import { GlobalContext } from "../../Context/ContextProvider";
import Table from "../../component/Table/Table";
import TodoItem from "../../component/TodoItem/TodoItem";

const Task = () => {
  const { todo, setTodo } = useContext(GlobalContext);
  const [todoItem, setTodoItem] = useState(null);
  const [showTodoItem, setShowTodoItem] = useState(false);

  const handleSort = (sortBy) => {
    setTodo((prev) => {
      const sorted = [...prev].sort((a, b) => {
        if (sortBy === "important") {
          return b.important - a.important;
        }
        if (sortBy === "alphabetical") {
          return a.title.localeCompare(b.title);
        }
        if (sortBy === "createdAt") {
          return new Date(a.createdAt) - new Date(b.createdAt);
        }
        if (sortBy === "dueDate") {
          return new Date(a.dueDate) - new Date(b.dueDate);
        }
        return 0;
      });
      return sorted;
    });
  };

  const handleTodoItem = (item) => {
    setTodoItem(item);
    setShowTodoItem(!showTodoItem);
  };

  return (
    <div className="text-white grow py-5 px-6 overflow-hidden">
      <Title
        showDate={false}
        title={"Tasks"}
        Icon={GoHome}
        handleSort={handleSort}
      />
      <AddTask data={todo} setTodo={setTodo} />
      <Table data={todo} setTodo={setTodo} handleTodoItem={handleTodoItem} />
      {showTodoItem && (
        <TodoItem
          todoItem={todoItem}
          setTodo={setTodo}
          setShowTodoItem={setShowTodoItem}
        />
      )}
      {/* <div className="bg-red-600 h-full">

      </div> */}
    </div>
  );
};

export default Task;

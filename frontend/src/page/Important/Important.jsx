import React, { useContext, useState, useEffect } from "react";
import { FaRegStar } from "react-icons/fa";
import Title from "../../component/Title/Title";
import AddTask from "../../component/AddTask/AddTask";
import { GlobalContext } from "../../Context/ContextProvider";
import Table from "../../component/Table/Table";
import TodoItem from "../../component/TodoItem/TodoItem";

const Important = () => {
  const { todo, setTodo } = useContext(GlobalContext);
  const [importantTodo, setImportantTodo] = useState([]);
  const [todoItem, setTodoItem] = useState(null);
  const [showTodoItem, setShowTodoItem] = useState(false);

  useEffect(() => {
    const important = todo.filter((task) => task.important && !task.completed);
    setImportantTodo(important);
  }, [todo]);

  const handleSort = (sortBy) => {
    setImportantTodo((prev) => {
      const sorted = [...prev].sort((a, b) => {
        if (sortBy === "important") {
          return a.important - b.important;
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
        Icon={FaRegStar}
        title={"Important"}
        showDate={false}
        handleSort={handleSort}
      />
      <AddTask data={importantTodo} setTodo={setTodo} />
      <Table
        data={importantTodo}
        setTodo={setTodo}
        handleTodoItem={handleTodoItem}
      />
      {showTodoItem && (
        <TodoItem
          todoItem={todoItem}
          setTodo={setTodo}
          setShowTodoItem={setShowTodoItem}
        />
      )}
    </div>
  );
};

export default Important;

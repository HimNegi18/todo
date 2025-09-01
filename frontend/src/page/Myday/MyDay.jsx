import React, { useContext, useEffect, useState } from "react";
import Title from "../../component/Title/Title";
import { IoSunnyOutline } from "react-icons/io5";
import AddTask from "../../component/AddTask/AddTask";
import Table from "../../component/Table/Table";
import { GlobalContext } from "../../Context/ContextProvider";
import TodoItem from "../../component/TodoItem/TodoItem";

const MyDay = () => {
  const { todo, setTodo } = useContext(GlobalContext);
  const [mydayTodo, setMydayTodo] = useState([]);
  const [todoItem, setTodoItem] = useState(null);
  const [showTodoItem, setShowTodoItem] = useState(false);

  useEffect(() => {
    const myday = todo.filter((task) => {
      const createdDay = new Date(task.createdAt);
      const today = new Date();

      const createdDayString = createdDay.toISOString().split("T")[0];
      const todayString = today.toISOString().split("T")[0];
      return createdDayString == todayString && !task.completed;
    });

    setMydayTodo(myday);
  }, [todo]);

  const handleSort = (sortBy) => {
    setMydayTodo((prev) => {
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
        Icon={IoSunnyOutline}
        title="My Day"
        showDate={true}
        handleSort={handleSort}
      />
      <AddTask data={mydayTodo} setTodo={setTodo} />
      <Table
        data={mydayTodo}
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

export default MyDay;

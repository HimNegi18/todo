import { createContext, useEffect, useState } from 'react';
import api from '../utils/api';

export const GlobalContext = createContext();

export default function GlobalState({ children }) {
  const [sidebarToggle, setSidebarToggle] = useState(true);
  const [todo, setTodo] = useState([])

  useEffect(() => {
    async function fetchData(){
      const res = await api.get('/api/get-todo');
      setTodo(res.data);
    }
    fetchData();
  },[])
  
  return (
    <GlobalContext.Provider value={{ sidebarToggle, setSidebarToggle, todo, setTodo }}>
      {children}
    </GlobalContext.Provider>
  );
};


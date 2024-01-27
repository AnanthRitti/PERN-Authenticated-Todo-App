import ListHeader from "./components/ListHeader";
import TodoList from "./components/TodoList";
import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";
import Auth from "./components/Auth";
import { useCookies } from "react-cookie";

function App() {
  const [cookie, setCookie, removeCookie] = useCookies(null);
  const userEmail = cookie.Email;
  const token = cookie.AuthToken;
  const [tasks, setTasks] = useState(null);

  async function getData() {
    try {
      const result = await axios.get(`http://localhost:3000/todos/${userEmail}`);
      const json = await result.data;

      console.log(json);
      setTasks(json);
    } catch (err) {
      console.log(err);
    }
  }

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <div className="app">
      {token ? (
        <div>
          <ListHeader listName="🎯To-Do List" getData={getData} />
          {tasks && tasks.map((task) => <TodoList key={task.id} task={task} getData={getData} />)}
        </div>
      ) : (
        <Auth />
      )}
    </div>
  );
}

export default App;

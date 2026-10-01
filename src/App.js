import { createElement as h, useState, useContext } from "react";
import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { ThemeContext } from "./context/ThemeContext";
import useLocalStorage from "./hooks/useLocalStorage";
import { initialTasks } from "./tasks";

function App() {
  const { theme } = useContext(ThemeContext);
  const [tasks, setTasks] = useLocalStorage("tasks", initialTasks);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const addTask = (title) => {
    const newTask = { id: Date.now(), title: title, completed: false };
    setTasks([...tasks, newTask]);
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const total = tasks.length;
  const doneCount = tasks.filter((task) => task.completed).length;
  const todoCount = total - doneCount;

  const visibleTasks = tasks
    .filter((task) => {
      if (filter === "done") return task.completed;
      if (filter === "todo") return !task.completed;
      return true;
    })
    .filter((task) =>
      task.title.toLowerCase().includes(search.toLowerCase())
    );

  return h(
    "div",
    { className: "app " + theme },
    h(
      "div",
      { className: "container" },
      h(Header),
      h(TaskForm, { onAdd: addTask }),
      h(
        "div",
        { className: "toolbar" },
        h(
          "select",
          { value: filter, onChange: (e) => setFilter(e.target.value) },
          h("option", { value: "all" }, "Tất cả"),
          h("option", { value: "todo" }, "Chưa làm"),
          h("option", { value: "done" }, "Hoàn thành")
        ),
        h("input", {
          type: "text",
          placeholder: "Tìm kiếm...",
          value: search,
          onChange: (e) => setSearch(e.target.value),
        })
      ),
      h(
        "p",
        { className: "stats" },
        "Tổng: " + total + " | Chưa làm: " + todoCount + " | Hoàn thành: " + doneCount
      ),
      h(TaskList, {
        tasks: visibleTasks,
        onToggle: toggleTask,
        onDelete: deleteTask,
      })
    )
  );
}

export default App;

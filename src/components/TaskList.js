import { createElement as h } from "react";
import TaskItem from "./TaskItem";

function TaskList({ tasks, onToggle, onDelete }) {
  if (tasks.length === 0) {
    return h("p", { className: "empty" }, "Không có công việc nào.");
  }

  return h(
    "ul",
    { className: "task-list" },
    tasks.map((task) =>
      h(TaskItem, {
        key: task.id,
        task: task,
        onToggle: onToggle,
        onDelete: onDelete,
      })
    )
  );
}

export default TaskList;

import { createElement as h } from "react";

function TaskItem({ task, onToggle, onDelete }) {
  return h(
    "li",
    { className: "task-item" },
    h(
      "label",
      null,
      h("input", {
        type: "checkbox",
        checked: task.completed,
        onChange: () => onToggle(task.id),
      }),
      h("span", { className: task.completed ? "done" : "" }, task.title)
    ),
    h("button", { onClick: () => onDelete(task.id) }, "Xóa")
  );
}

export default TaskItem;

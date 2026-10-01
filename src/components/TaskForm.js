import { createElement as h, useState } from "react";

function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = title.trim();
    if (text === "") return;
    onAdd(text);
    setTitle("");
  };

  return h(
    "form",
    { className: "task-form", onSubmit: handleSubmit },
    h("input", {
      type: "text",
      placeholder: "Nhập tên công việc...",
      value: title,
      onChange: (e) => setTitle(e.target.value),
    }),
    h("button", { type: "submit" }, "Thêm")
  );
}

export default TaskForm;

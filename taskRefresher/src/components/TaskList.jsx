import TaskItem from "./TaskItem";

export default function TaskList({ lists, toggle, removeTask }) {
  return (
    <ul style={{ padding: 0, listStyle: "none" }}>
      {lists.map((t) => (
        <TaskItem
          key={t.id}
          t={t}
          toggle={toggle}
          removeTask={removeTask}
        ></TaskItem>
      ))}
    </ul>
  );
}

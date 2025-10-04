import TaskItem from "./TaskItem";

export default function TaskList({ lists, editTask, removeTask }) {
  return (
    <ul style={{ padding: 0, listStyle: "none" }}>
      {lists.map((t) => (
        <TaskItem
          key={t.id}
          t={t}
          editTask={editTask}
          removeTask={removeTask}
        ></TaskItem>
      ))}
    </ul>
  );
}

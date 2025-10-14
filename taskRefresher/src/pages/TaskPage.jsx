import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import FilterBar from "../components/FilterBar";
import { useTasks } from "../hooks/useTasks";

export default function TaskPage() {
  const {
    tasks,
    text,
    filter,
    loading,
    error,
    pending,
    visible,
    setTasks,
    setText,
    setFilter,
    handleSubmit,
    editTask,
    removeTask,
  } = useTasks();

  function onSubmit(e) {
    e.preventDefault();
    handleSubmit(text);
  }

  return (
    <main
      style={{ maxWidth: 540, margin: "2rem auto", fontFamily: "system-ui" }}
    >
      <h1>Task Tracker</h1>
      {loading ? (
        <p>Loading Tasks...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div>
          <TaskForm
            text={text}
            setText={setText}
            handleSubmit={onSubmit}
            pending={pending}
          ></TaskForm>
          <TaskList
            lists={visible}
            editTask={editTask}
            removeTask={removeTask}
          ></TaskList>
          <FilterBar setFilter={setFilter} filter={filter}></FilterBar>
        </div>
      )}
    </main>
  );
}

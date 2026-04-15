import styles from "./taskManager.module.css";
import { mockTaskManager } from "./mockTaskManager";
import { useEffect, useState } from "react";

const TaskManager = () => {
  const [tasks, setTasks] = useState<{ id: number; name: string }[]>([]);
  const [newTask, setNewTask] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasks = await mockTaskManager();
        setTasks(tasks as { id: number; name: string }[]);
        console.log("Fetched tasks:", tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const handleDelete = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newTask.trim()) {
      alert("Please enter a task name.");
      return;
    }

    setTasks((prevTasks) => [
      ...prevTasks,
      { id: prevTasks.length + 1, name: newTask },
    ]);
    setNewTask("");
  };

  const filteredTasks = tasks.filter((task) =>
    task.name.toLowerCase().includes(query.toLowerCase())
  );


  return (
    <div className={styles.wrapper}>
      <header>
        <div className={styles.pageBanner}>
          <h1 className={styles.title}>Task Manager</h1>

          <form className={styles.searchTasks}>
            <input
              type="text"
              placeholder="Search tasks..."
              onChange={(e) => setQuery(e.target.value)}
            />
          </form>
        </div>
      </header>

      <div className={styles.taskList}>
        <h2 className={styles.title}>Tasks to Do</h2>

        <ul>
          {filteredTasks.map((task) => (
            <li key={task.id}>
              <span className={styles.name}>{task.name}</span>
              <span
                className={styles.delete}
                onClick={() => handleDelete(task.id)}
              >
                delete
              </span>
            </li>
          ))}
        </ul>
      </div>

      <form className={styles.addTask} onSubmit={handleSubmit}>
        <input
          onChange={(e) => setNewTask(e.target.value)}
          type="text"
          placeholder="Add a task..."
        />
        <button>Add</button>
      </form>
    </div>
  );
};

export default TaskManager;

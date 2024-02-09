import "./styles.css";

import { TaskComponent } from "../../components/task";
import { NewTask } from "../../components/new-task";
import { useGetTasks } from "../../hooks/useTask";
import { Task } from "../../api/task";

export const Home = () => {
  const { data: tasks, isLoading, isSuccess } = useGetTasks();

  return (
    <main className="container">
      <h1 className="title">Lista de Tarefas</h1>
      <section
        className={`
        to-do-list 
        ${isLoading ? "loading" : undefined} 
        ${isSuccess && tasks.length == 0 ? "none-task" : undefined}
      `}
      >
        <ul>
          {isSuccess &&
            tasks.map((task: Task) => (
              <TaskComponent key={task.id} {...task} />
            ))}
        </ul>
      </section>
      <NewTask />
    </main>
  );
};

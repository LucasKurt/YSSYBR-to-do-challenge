import "./styles.css";

import { TaskComponent } from "../../components/task";
import { useFetch } from "../../hooks/useFetch";
import { Task } from "../../types/task";
import { NewTask } from "../../components/new-task";

export const Home = () => {
  const {
    data: tasks,
    isFetching,
    isSuccess,
  } = useFetch<Task[]>("tasks");

  // useEffect(() => {
  //   console.log({
  //     state: queryClient.getQueryState<Task[]>(["tasks"]),
  //     queryData: queryClient.getQueryData<Task[]>(["tasks"]),
  //     fetchData: tasks,
  //     fetching: isFetching,
  //     fetched: isFetched,
  //   });
  // }, [queryClient, tasks, isFetching]);

  return (
    <main className="container">
      <h1 className="title">Lista de Tarefas</h1>
      <section
        className={`
        to-do-list 
        ${isFetching && "loading"} 
        ${isSuccess && tasks.length == 0 && "none-task"}
      `}
      >
        <ul>
          {tasks?.map((task) => (
            <TaskComponent key={task.id} {...task} />
          ))}
        </ul>
      </section>
      <NewTask />
    </main>
  );
};

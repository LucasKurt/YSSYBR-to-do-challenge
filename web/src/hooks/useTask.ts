import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Task,
  getTasks,
  createTask,
  deleteTask,
  editTask,
  finishTask,
} from "../api/task";

const key = "task";

export const useGetTasks = () => {
  return useQuery({
    queryKey: [key],
    queryFn: getTasks,
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTask,
    onSuccess(task) {
      const tasks: Task[] | undefined = queryClient.getQueryData([key]);
      tasks && queryClient.setQueryData([key], [...tasks, task]);
      queryClient.invalidateQueries({queryKey: [key]});
    },
  });
};

export const useEditTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editTask,
    onSuccess(task) {
      let tasks: Task[] | undefined = queryClient.getQueryData([key]);
      tasks = tasks?.map((prevTask: Task) => {
        if (prevTask.id === task.id) {
          prevTask.name = task.name;
        }
        return prevTask;
      });
      tasks ?? queryClient.setQueryData([key], tasks);
    },
  });
};

export const useFinishTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: finishTask,
    onSuccess(task) {
      let tasks: Task[] | undefined = queryClient.getQueryData([key]);
      tasks = tasks?.map((prevTask: Task) => {
        if (prevTask.id === task.id) {
          prevTask.finished = task.finished;
        }
        return prevTask;
      });
      tasks ?? queryClient.setQueryData([key], tasks);
      queryClient.invalidateQueries({queryKey: [key]});
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTask,
    onSuccess: (id) => {
      let tasks: Task[] | undefined = queryClient.getQueryData([key]);
      tasks = tasks?.filter((task) => task.id !== id);
      tasks && queryClient.setQueryData([key], tasks);
    },
  });
};

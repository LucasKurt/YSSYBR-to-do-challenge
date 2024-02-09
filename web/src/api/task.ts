import { api } from "../config/axios";

export type Task = {
  id: string;
  name: string;
  finished: boolean;
};

export const getTasks = async (): Promise<Task[]> => {
  return (await api.get("/tasks")).data;
};

export const createTask = async (task: { name: string }): Promise<Task> => {
  return (await api.post("/tasks", task)).data;
};

export const editTask = async (task: {
  id: string;
  name: string;
}): Promise<Task> => {
  return (await api.put(`/tasks/${task.id}`, { name: task.name })).data;
};

export const finishTask = async (task: {
  id: string;
  finished: boolean;
}): Promise<Task> => {
  return (await api.patch(`/tasks/${task.id}`, { finished: task.finished })).data;
};

export const deleteTask = async (id: string): Promise<string> => {
  await api.delete(`/tasks/${id}`);
  return id;
};

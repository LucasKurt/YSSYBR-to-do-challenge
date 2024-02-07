export type Task = {
  id: string;
  name: string;
  finished: boolean;
}

export type Tasks = {
  tasks: Task[]
}
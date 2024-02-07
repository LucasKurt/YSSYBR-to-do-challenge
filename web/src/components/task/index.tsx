import "./styles.css";
import image from "../../assets/img/icon-trash.svg";
import * as z from "zod";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePatch } from "../../hooks/usePatch";
import { usePut } from "../../hooks/usePut";
import { useDelete } from "../../hooks/useDelete";
import { useEffect } from "react";
const taskSchema = z.object({
  id: z.string(),
  name: z.string().min(3, "Mínimo 3 caracteres"),
  finished: z.boolean(),
});

type FormData = z.infer<typeof taskSchema>;

export const TaskComponent = ({ id, name, finished }: FormData) => {
  const { mutate: path } = usePatch("/tasks", id, { queryKey: ["tasks"] });
  const { mutate: put } = usePut("/tasks", id, { queryKey: ["tasks"] });
  const { mutate: remove } = useDelete("/tasks", id, { queryKey: ["tasks"] });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitted, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: { id, name, finished },
  });
  
  const finishTask = ({
    currentTarget: { checked },
  }: React.FormEvent<HTMLInputElement>) => {
    path({ finished: checked });
  };

  const editTask = ({ name }: FormData) => {
    put({ name });
  };

  const deleteTask = () => {
    const confirmDelete = confirm("Deseja deletar a tarefa: " + name);
    confirmDelete && remove();
  };

  return (
    <li className="task" {...register("id")}>
      <input type="checkbox" {...register("finished")} onClick={finishTask} />

      <form onSubmit={handleSubmit(editTask)}>
        <input
          type="text"
          className={finished ? "finished" : ""}
          {...register("name", {
            onBlur() {
              if (!isSubmitted || !isValid) {
                reset();
              }
            },
          })}
        />
        {errors.name && (
          <span className="error-message">{errors.name.message}</span>
        )}
      </form>

      <form onSubmit={handleSubmit(deleteTask)}>
        <button type="submit" >
          <img src={image} alt="icon-trash" />
        </button>
      </form>
    </li>
  );
};

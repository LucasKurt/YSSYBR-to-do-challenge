import "./styles.css";
import image from "../../assets/img/icon-trash.svg";
import * as z from "zod";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDeleteTask, useEditTask, useFinishTask } from "../../hooks/useTask";

const taskSchema = z.object({
  id: z.string(),
  name: z.string().min(3, "Mínimo 3 caracteres"),
  finished: z.boolean(),
});

type FormData = z.infer<typeof taskSchema>;

export const TaskComponent = ({ id, name, finished }: FormData) => {
  const deleteTask = useDeleteTask();
  const editTask = useEditTask();
  const finishTask = useFinishTask();
  const {
    register,
    trigger,
    setFocus,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: { id, name, finished },
  });

  const onFinish = async ({
    currentTarget: { checked },
  }: React.FormEvent<HTMLInputElement>) => {
    await finishTask.mutateAsync({ id, finished: checked });
  };

  const onEdit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") {
      trigger();
      editTask.mutate({ id, name: e.currentTarget.value });
      isValid && e.currentTarget.blur();
    }
  };

  const onDelete = async () => {
    const confirmDelete = confirm("Deseja deletar a tarefa: " + name);
    confirmDelete && await deleteTask.mutateAsync(id);
  };

  const changeBg = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.classList.add("on-focus-bg");
    e.currentTarget.parentElement?.classList.add("on-focus-bg");
  };

  return (
    <li className="task " key={id} {...register("id")}>
      <input type="checkbox" {...register("finished")} onClick={onFinish} />

      <input
        type="text"
        className={finished ? "finished" : ""}
        autoComplete="off"
        {...register("name", {
          onBlur(e: React.FocusEvent<HTMLInputElement>) {
            e.currentTarget.classList.remove("on-focus-bg");
            trigger();
            if (isValid && e.currentTarget.value) {
              editTask.mutate({ id, name: e.currentTarget.value });
            }
            if (!isValid) {
              setFocus("name");
              e.currentTarget.classList.add("on-focus-bg");
            }
          },
        })}
        onKeyDown={onEdit}
        onFocus={changeBg}
      />
      {errors.name && (
        <span className="error-message">{errors.name.message}</span>
      )}

      <button onClick={onDelete}>
        <img src={image} alt="icon-trash" />
      </button>
    </li>
  );
};

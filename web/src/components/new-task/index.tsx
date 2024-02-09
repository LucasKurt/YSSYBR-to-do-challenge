import "./styles.css";
import * as z from "zod";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useCreateTask } from "../../hooks/useTask";

const newTaskSchema = z.object({
  name: z.string().min(3, "A tarefa precisa de no mínimo 3 caracteres"),
});

type FormData = z.infer<typeof newTaskSchema>;

export const NewTask = () => {
  const createTask = useCreateTask();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful,  },
  } = useForm<FormData>({
    resolver: zodResolver(newTaskSchema),
  });

  useEffect(() => {
    isSubmitSuccessful && reset();
  }, [reset, isSubmitSuccessful]);

  const newTask = async (data: FormData) => {
    await createTask.mutateAsync(data);
    document.activeElement && (document.activeElement as HTMLElement).blur();
  };

  return (
    <>
      <form
        className="new-task"
        autoComplete="off"
        onSubmit={handleSubmit(newTask)}
      >
        <input
          type="text"
          placeholder="Digite sua nova tarefa aqui..."
          {...register("name", {
            onBlur: () => {
              reset();
            },
          })}
        />
        {errors.name && (
          <span className="error-message">{errors.name.message}</span>
        )}
      </form>
    </>
  );
};

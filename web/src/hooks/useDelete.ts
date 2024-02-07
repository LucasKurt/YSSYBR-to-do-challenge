import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { api } from "../config/axios";

export function useDelete(
  resource: string,
  id: string,
  invalidateQueries?: InvalidateQueryFilters
) {
  const queryClient = useQueryClient();
  const deleteData = async () => {
    await api.delete(`${resource}/${id}`);
    return id;
  };

  const mutate = useMutation({
    mutationFn: deleteData,
    onSuccess: () => {
      setTimeout(() => {queryClient.invalidateQueries(invalidateQueries)}, 1000);
    },
    onError: (err) => console.log(err),
  });

  return mutate;
}

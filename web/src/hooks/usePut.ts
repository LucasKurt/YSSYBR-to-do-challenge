import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { api } from "../config/axios";

export function usePut(
  resource: string,
  id: string,
  invalidateQueries?: InvalidateQueryFilters
) {
  const queryClient = useQueryClient();
  const putData = async (data: unknown) => {
    return await api.put(`${resource}/${id}`, data);
  };

  const mutate = useMutation({
    mutationFn: putData,
    onSuccess: () => queryClient.invalidateQueries(invalidateQueries),
    onError: (err) => console.log(err),
  });

  return mutate;
}

import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { api } from "../config/axios";

export function usePatch(
  resource: string,
  id: string,
  invalidateQueries?: InvalidateQueryFilters
) {
  const queryClient = useQueryClient();
  const patchData = async (data: unknown) => {
    return await api.patch(`${resource}/${id}`, data);
  };

  const mutate = useMutation({
    mutationFn: patchData,
    onSuccess: () => queryClient.invalidateQueries(invalidateQueries),
    onError: (err) => console.log(err),
  });

  return mutate;
}

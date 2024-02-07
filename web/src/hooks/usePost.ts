import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { api } from "../config/axios";

export function usePost(
  resource: string,
  invalidateQueries?: InvalidateQueryFilters
) {
  const queryClient = useQueryClient();
  const postData = async (data: unknown) => {
    return await api.post(resource, data);
  };

  const mutate = useMutation({
    mutationFn: postData,
    onSuccess: () => queryClient.invalidateQueries(invalidateQueries),
  });

  return mutate;
}

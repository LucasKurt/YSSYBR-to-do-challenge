import { useQuery } from "@tanstack/react-query";
import { api } from "../config/axios";

export function useFetch<T = unknown>(resource: string, id?: string) {
  const fetch = async () => {
    const response = await api.get(`/${resource}${id ? "/" + id : ""}`);
    return response.data;
  };

  return useQuery<T>({
    queryFn: fetch,
    queryKey: [resource],
    enabled: id ? !!id : undefined,
  });
}

import { api } from "@/shared/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { useGetUsersListQueryRequest } from "../model/types";

export const useGetUsersListQuery = ({
  page,
  search,
}: useGetUsersListQueryRequest) =>
  useQuery({
    queryKey: ["users", page, search],
    queryFn: async () => {
      const { data } = await api.get(
        `/users?page=${page}&per_page=6&search=${search}`
      );
      return data;
    },
  });

export const useGetUserDataQuery = (id?: string) =>
  useQuery({
    queryKey: ["user", id],
    queryFn: async () => {
      const { data } = await api.get(`/users/${id}`);
      return data;
    },
    enabled: !!id,
  });

export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, payload }: { id?: string; payload: unknown }) => {
      const { data } = await api.put(`/users/${id}`, payload);
      return data;
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["user", id] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

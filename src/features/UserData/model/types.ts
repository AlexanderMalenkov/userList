import type { useGetUserDataQueryResponse } from "@/entities/users/model/types";

export type UserDataProps = {
  userData?: useGetUserDataQueryResponse;
  isLoading: boolean;
  isError: boolean;
};

export type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};

export type useGetUsersListQueryRequest = {
  page: number;
  search: string;
};

export type UsersListMeta = {
  powered_by: string;
  upgrade_url: string;
  docs_url: string;
  template_gallery: string;
  message: string;
  features: string[];
  upgrade_cta: string;
};

export type UsersListSupport = {
  url: string;
  text: string;
};

export type UsersListData<T> = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: T;
  support: UsersListSupport;
  _meta: UsersListMeta;
};

export type UseGetUsersListQueryResponse = UsersListData<User[]>;

export type useGetUserDataQueryResponse = UsersListData<User>;
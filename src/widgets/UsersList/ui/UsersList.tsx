import { useMemo, useRef, useState } from "react";
import { Input, LoadingOverlay, Pagination } from "@mantine/core";
import debounce from "lodash.debounce";
import { useGetUsersListQuery } from "@/entities/users";
import { UsersTable } from "@/features/UsersTable";
import styles from "./UsersList.module.scss";

export const UsersList = () => {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const ref = useRef<HTMLDivElement>(null);

  // COMMENT: НА БЭКЕ ПОИСК НЕ РАБОТАЕТ
  const { data, isLoading } = useGetUsersListQuery({
    page,
    search,
  });

  const totalPages = useMemo(() => data?.total_pages, [data]);

  const handleChange = useMemo(
    () =>
      debounce((value: string) => {
        setSearch(value);
      }, 400),
    []
  );

  return (
    <div className={styles.wrapper} ref={ref}>
      <Input
        size="lg"
        radius="md"
        placeholder="Search user"
        onChange={(e) => handleChange(e.target.value)}
      />
      {isLoading ? (
        <LoadingOverlay
          visible={isLoading}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
          style={{
            maxHeight: "512px",
          }}
        />
      ) : (
        <UsersTable data={data?.data} />
      )}

      <Pagination total={totalPages} onChange={setPage} />
    </div>
  );
};

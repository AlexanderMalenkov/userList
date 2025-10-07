import { useMemo } from "react";
import "./UsersTable.scss";
import type { UsersTableProps } from "../model/types";
import { useNavigate } from "react-router-dom";
import { Table } from "@mantine/core";

export const UsersTable = ({ data }: UsersTableProps) => {
  const navigate = useNavigate();

  const rows = useMemo(
    () =>
      data?.map((user) => (
        <Table.Tr key={user.id}>
          <Table.Td
            style={{ cursor: "pointer" }}
            onClick={() => {
              if (user?.id) {
                navigate(`/users/${user.id}`);
              }
            }}
          >
            {user.id}
          </Table.Td>
          <Table.Td>{user.first_name}</Table.Td>
          <Table.Td>{user.last_name}</Table.Td>
          <Table.Td>{user.email}</Table.Td>
        </Table.Tr>
      )),
    [data, navigate]
  );

  return data?.length ? (
    <Table
      horizontalSpacing="xl"
      verticalSpacing="lg"
      striped
      highlightOnHover
      withTableBorder
    >
      <Table.Thead>
        <Table.Tr>
          <Table.Th>ID</Table.Th>
          <Table.Th>First Name</Table.Th>
          <Table.Th>Last Name</Table.Th>
          <Table.Th>Email</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  ) : (
    <div className="no-data">No users found</div>
  );
};

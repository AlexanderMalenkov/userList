import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Modal, TextInput, Notification } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconX, IconCheck } from "@tabler/icons-react";
import { useGetUserDataQuery, useUpdateUserMutation } from "@/entities/users";
import { UserAvatar } from "@/entities/users/ui/UserAvatar/UserAvatar";
import type { EditUserFormValues, EditUserModalProps } from "../model/types";
import styles from "./EditUserModal.module.scss";

export const EditUserModal = ({ opened, close }: EditUserModalProps) => {
  const { userId } = useParams();
  const { data: userData, isLoading } = useGetUserDataQuery(userId);
  const [isInitialized, setIsInitialized] = useState(false);

  const updateUser = useUpdateUserMutation();

  const timerRef = useRef<number | null>(null);

  const handleSubmit = (values: EditUserFormValues) => {
    const handleTimeout = ({ isSuccess }: { isSuccess: boolean }) => {
      timerRef.current = window.setTimeout(() => {
        if (isSuccess) close();
        setIsInitialized(false);
        updateUser.reset();
      }, 3000);
    };

    updateUser.mutate(
      { id: userId, payload: values },
      {
        onSuccess: () => handleTimeout({ isSuccess: true }),
        onError: () => handleTimeout({ isSuccess: false }),
      }
    );
  };

  const form = useForm({
    mode: "controlled",
    validate: {
      first_name: (value) =>
        value.trim().length > 0 ? null : "Required field",
      last_name: (value) => (value.trim().length > 0 ? null : "Required field"),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Incorrect email"),
    },
  });

  useEffect(() => {
    if (userData?.data && !isInitialized) {
      form.setValues({
        first_name: userData.data.first_name,
        last_name: userData.data.last_name,
        email: userData.data.email,
      });
      setIsInitialized(true);
    }
  }, [userData, form, isInitialized]);

  useEffect(() => {
    return () => {
      const timer = timerRef.current;
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, []);

  const xIcon = <IconX size={20} />;
  const checkIcon = <IconCheck size={20} />;

  return (
    <>
      {updateUser.isError && (
        <Notification
          icon={xIcon}
          color="red"
          title="Error!"
          withCloseButton={false}
        >
          Something went wrong
        </Notification>
      )}
      {updateUser.isSuccess && (
        <Notification
          icon={checkIcon}
          color="teal"
          title="Success!"
          withCloseButton={false}
        >
          User was updated!
        </Notification>
      )}
      <Modal opened={opened} onClose={close} title="Edit user">
        <form className={styles.wrapper} onSubmit={form.onSubmit(handleSubmit)}>
          <div>
            <UserAvatar
              avatarUrl={userData?.data?.avatar}
              isLoading={isLoading}
              // COMMENT: РЕАЛИЗОВАЛ ВЫГРУЗКУ АВАТАРКИ, ЕСЛИ НАДО, МОЖНО ЕЁ ОТПРАВЛЯТЬ, ДЛЯ ЭТОГО НУЖНО БУДЕТ МЕНЯТЬ ЗАГОЛОВКИ
              // onChange={(file) => {
              //   form.setValues({ ...form.values, avatar: file });
              // }}
            />
          </div>
          <TextInput
            withAsterisk
            label="First Name"
            key={form.key("first_name")}
            {...form.getInputProps("first_name")}
          />
          <TextInput
            withAsterisk
            label="Last name"
            key={form.key("last_name")}
            {...form.getInputProps("last_name")}
          />
          <TextInput
            withAsterisk
            label="Email"
            placeholder="your@email.com"
            key={form.key("email")}
            {...form.getInputProps("email")}
          />
          <Button type="submit" disabled={updateUser.isPending}>
            Edit
          </Button>
        </form>
      </Modal>
    </>
  );
};

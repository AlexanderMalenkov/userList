import { Button, LoadingOverlay, Notification } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { EditUserModal } from "@/features/EditUserModal";
import { UserData } from "@/features/UserData";
import styles from "./UserDetailData.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useGetUserDataQuery } from "@/entities/users";
import { IconX } from "@tabler/icons-react";
import { useEffect, useState } from "react";

export const UserDetailData = () => {
  const { userId } = useParams();
  const [opened, { open, close }] = useDisclosure(false);

  const [isDisplayError, setIsDisplayError] = useState(false);

  const { data: userData, isLoading, isError } = useGetUserDataQuery(userId);

  const navigate = useNavigate();

  const xIcon = <IconX size={20} />;

  // COMMENT: всю логику с нотификацией ошибки можно в отдельный хук, чтобы можно было вызывать наподобие tanstack, вызывать через портал и вшить дефолтный таймер
  useEffect(() => {
    if (isError) {
      setIsDisplayError(true);

      const timer = setTimeout(() => {
        setIsDisplayError(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isError]);

  return (
    <div className={styles.wrapper}>
      <LoadingOverlay
        visible={isLoading}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
        style={{
          maxHeight: "356px",
        }}
      />
      {isDisplayError && (
        <Notification
          icon={xIcon}
          color="red"
          title="Error!"
          withCloseButton={false}
        >
          Error while loading user data
        </Notification>
      )}
      <UserData userData={userData} isLoading={isLoading} isError={isError} />
      <div className={styles.formControls}>
        <Button variant="default" onClick={() => navigate(-1)}>
          Back
        </Button>
        <Button onClick={open} disabled={isError || isLoading}>
          Edit
        </Button>
      </div>
      <EditUserModal opened={opened} open={open} close={close} />
    </div>
  );
};

import { InfoInput } from "@/shared/ui/InfoInput/InfoInput";
import styles from "./UserData.module.scss";
import { Skeleton } from "@mantine/core";
import type { UserDataProps } from "../model/types";

export const UserData = ({ userData, isLoading, isError }: UserDataProps) => {
  return (
    <div className={styles.wrapper}>
      <div>
        {isLoading ? (
          <Skeleton className={styles.avatar} />
        ) : (
          <img
            src={userData?.data?.avatar}
            alt={
              userData
                ? `${userData?.data?.first_name} ${userData?.data?.last_name}`
                : "avatar"
            }
            className={styles.avatar}
          />
        )}
        <h2>ID: {userData?.data?.id}</h2>
      </div>
      <div className={styles.dataForm}>
        <InfoInput
          value={userData?.data?.first_name}
          label="First Name"
          disabled={isError}
        />
        <InfoInput
          value={userData?.data?.last_name}
          label="Last Name"
          disabled={isError}
        />

        <InfoInput
          value={userData?.data?.email}
          label="Email"
          disabled={isError}
        />
      </div>
    </div>
  );
};

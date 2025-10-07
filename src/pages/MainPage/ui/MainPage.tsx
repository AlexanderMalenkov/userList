import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import styles from "./MainPage.module.scss";
import type { MainPageProps } from "../model/types";

export const MainPage = ({ isErrorPage }: MainPageProps) => {
  const navigate = useNavigate();
  return (
    <div className={styles.wrapper}>
      {isErrorPage ? (
        <h1>404 - Page Not Found</h1>
      ) : (
        <h1>Welcome to the Users list!</h1>
      )}
      <Button variant="filled" size="xl" onClick={() => navigate("/")}>
        Go to list
      </Button>
    </div>
  );
};

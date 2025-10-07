import { Outlet } from "react-router-dom";
import styles from "./AppLayout.module.scss";

export const AppLayout = () => {
  return (
    <div className={styles.wrapper}>
      <Outlet />
    </div>
  );
};

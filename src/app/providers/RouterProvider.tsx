import {
  createBrowserRouter,
  RouterProvider as RRProvider,
} from "react-router-dom";
import { UsersPage } from "@pages/UsersPage";
import { UserDetailPage } from "@/pages/UserDetailPage";
import { AppLayout } from "@/shared/ui/AppLayout/AppLayout";
import { MainPage } from "@/pages/MainPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <UsersPage /> },
      { path: "users/:userId", element: <UserDetailPage /> },
      { path: "*", element: <MainPage isErrorPage /> },
    ],
  },
]);

export const RouterProvider = () => {
  return <RRProvider router={router} />;
};

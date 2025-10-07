import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { QueryProvider } from "./providers/QueryProvider";
import { RouterProvider } from "./providers/RouterProvider";
import "./App.css";

function App() {
  return (
    <MantineProvider>
      <QueryProvider>
        <RouterProvider />
      </QueryProvider>
    </MantineProvider>
  );
}

export default App;

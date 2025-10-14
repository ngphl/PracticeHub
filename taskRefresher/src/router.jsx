import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import TaskPage from "./pages/TaskPage";
import AboutPage from "./pages/AboutPage";
import { tasksLoader } from "./pages/taskLoader";

const NotFound = () => <p style={{ padding: 24 }}>Not Found</p>;
const RouteError = () => (
  <div style={{ padding: 24 }}>
    <h3>Something went wrong.</h3>
    <p>Try refreshing the page.</p>
  </div>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <RouteError />,
    children: [
      {
        index: true,
        loader: tasksLoader,
        element: <TaskPage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Home from "./pages/Home.tsx";
import Login from "./pages/Login/index.tsx";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import DetailProfile from "./pages/DetailProfile/index.tsx";
import DetailThread from "./pages/DetailThread/index.tsx";
import RegisterPage from "./pages/Register/index.tsx";

const client = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/auth/register",
    element: <RegisterPage />,
  },
  {
    path: "/auth/login",
    element: <Login />,
  },
  {
    path: "/profile/:username",
    element: <DetailProfile />,
  },
  {
    path: "/thread/:threadId",
    element: <DetailThread />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ChakraProvider>
    <QueryClientProvider client={client}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </ChakraProvider>
);

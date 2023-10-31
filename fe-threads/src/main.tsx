import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Home from "./pages/Home/index.tsx";
import Login from "./pages/Login/index.tsx";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import DetailProfile from "./pages/DetailProfile/index.tsx";
import DetailThread from "./pages/DetailThread/index.tsx";
import RegisterPage from "./pages/Register/index.tsx";
import SkeletonPage from "./pages/Skeleton/index.tsx";
import LandingPage from "./pages/LandingPage/index.tsx";
import { configureStore } from "@reduxjs/toolkit";
import RootReducer from "./store/RootReducer.ts";
import { Provider } from "react-redux";
import Search from "./pages/Search/index.tsx";
import Follows from "./pages/Follows/index.tsx";

const client = new QueryClient();
const store = configureStore({
  reducer: RootReducer,
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
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
  {
    path: "/skeleton",
    element: <SkeletonPage />,
  },
  {
    path: "/search",
    element: <Search />,
  },
  {
    path: "/follows",
    element: <Follows />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ChakraProvider>
    <QueryClientProvider client={client}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </QueryClientProvider>
  </ChakraProvider>
);

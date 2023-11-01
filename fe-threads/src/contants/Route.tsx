import RegisterPage from "@/components/RegisterPage";
import DetailProfile from "@/pages/DetailProfile";
import DetailThread from "@/pages/DetailThread";
import Follows from "@/pages/Follows";
import Home from "@/pages/Home";
import LandingPage from "@/pages/LandingPage";
import Login from "@/pages/Login";
import Search from "@/pages/Search";
import SkeletonPage from "@/pages/Skeleton";
// import { createBrowserRouter } from "react-router-dom";

const router = [
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
];

export default router;

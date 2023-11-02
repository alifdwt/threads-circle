import { useSelector } from "react-redux";
import { RootState } from "./store/type/RootState";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import { API, setAuthToken } from "./config/api";
import { AUTH_CHECK, AUTH_ERROR } from "./store/RootReducer";
import { publicRouter, privateRouter } from "./contants/Route";
import LandingPage from "./pages/LandingPage";

const App = () => {
  const auth = useSelector((state: RootState) => state.auth);
  console.log(auth);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // function authCheck
  const authCheck = async () => {
    try {
      setAuthToken(localStorage.token);
      const response = await API.get("/user/check");
      console.log("check auth app", response);

      dispatch(AUTH_CHECK(response.data.user));
      setIsLoading(false);
    } catch (err) {
      dispatch(AUTH_ERROR());
      console.log("auth check error", err);
      setIsLoading(false);
      navigate("/auth/login");
    }
  };

  useEffect(() => {
    if (localStorage.token) {
      authCheck();
    } else {
      setIsLoading(false);
    }
  }, []);

  const IsNotLogin = () => {
    if (!localStorage.token) {
      return <Navigate to="/auth/login" />;
    } else {
      return <Outlet />;
    }
  };

  const IsLogin = () => {
    if (localStorage.token) {
      return <Navigate to="/home" />;
    } else {
      return <Outlet />;
    }
  };

  return (
    <>
      {isLoading ? null : (
        <Routes>
          <Route path="/" element={<IsNotLogin />}>
            {privateRouter.map((route) => {
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.element}
                />
              );
            })}
          </Route>
          <Route path="/" element={<IsLogin />}>
            {publicRouter.map((route) => {
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.element}
                />
              );
            })}
          </Route>
          <Route index element={<LandingPage />} />
        </Routes>
      )}
    </>
  );
};
export default App;

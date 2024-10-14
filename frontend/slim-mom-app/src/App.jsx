import "./App.css";
import { Route, Routes } from "react-router-dom";
import { SharedLayout } from "./components/SharedLayout/SharedLayout";
import { RestrictedRoute } from "./components/RestrictedRoute/RestrictedRoute";
import { lazy, useEffect } from "react";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";
import { useDispatch } from "react-redux";
import { useAuth } from "./hooks/useAuth";
import * as auth from "./redux/auth/authOperations";

const MainPage = lazy(() => import("./pages/MainPage/MainPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage/RegisterPage"));
const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage"));
const CalculatorPage = lazy(() =>
  import("./pages/CalculatorPage/CalculatorPage")
);

function App() {
  const dispatch = useDispatch();
  const { isLoggedIn, accessToken, refreshToken, isRefreshing } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) {
      dispatch(auth.refreshToken());
    } else {
      console.log("Access Token:", accessToken);
      console.log("Refresh Token:", refreshToken);
      console.log("Is Refreshing:", isRefreshing);
    }
  }, [dispatch, isLoggedIn, accessToken, refreshToken, isRefreshing]);

  return (
    <>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route
            index
            element={
              <RestrictedRoute component={<MainPage />} redirectTo="/diary" />
            }
          />
          <Route
            path="/register"
            element={
              <RestrictedRoute redirectTo="/" component={<RegisterPage />} />
            }
          />
          <Route
            path="/login"
            element={
              <RestrictedRoute redirectTo="/" component={<LoginPage />} />
            }
          />
          <Route
            path="/calculator"
            element={
              <PrivateRoute component={<CalculatorPage />} redirectTo="/" />
            }
          />
          <Route
            path="/diary"
            element={
              <PrivateRoute component={<div>Diary</div>} redirectTo="/" />
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;

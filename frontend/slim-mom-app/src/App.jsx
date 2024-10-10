// import logo from './logo.svg';
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { SharedLayout } from "./components/SharedLayout/SharedLayout";
import { RestrictedRoute } from "./components/RestrictedRoute/RestrictedRoute";
import { lazy } from "react";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";

const MainPage = lazy(() => import("./pages/MainPage/MainPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage/RegisterPage"));
const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage"));
const Calculator = lazy(() => import("./pages/CalculatorPage/CalculatorPage"));
function App() {
  return (
    <>
      {/*{ isLoading && <Loader /> }*/}
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route
            index
            element={
              <RestrictedRoute
                component={<MainPage />}
                redirectTo="/transactions"
              />
            }
          />
          <Route
            path="/signup"
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
          {/* Protected routes (accessible only when logged in) */}
          <Route
            path="/calculator"
            element={<PrivateRoute component={<Calculator />} redirectTo="/" />}
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

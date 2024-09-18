// import logo from './logo.svg';
import './App.css';
import {Route, Routes} from "react-router-dom";
import {SharedLayout} from "./components/SharedLayout/SharedLayout";
import {RestrictedRoute} from "./components/RestrictedRoute/RestrictedRoute";
import {lazy} from "react";
import {PrivateRoute} from "./components/PrivateRoute/PrivateRoute";

const RegisterPage = lazy(() => import('./pages/RegisterPage/RegisterPage'));
const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage'));

function App() {
  return (
      <>
        {/*{ isLoading && <Loader /> }*/}
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<RestrictedRoute
                component={<div> test </div>}
                redirectTo="/transactions"
            />} />
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
                path="/transactions"
                element={
                  <PrivateRoute
                      component={<div />}
                      redirectTo="/"
                  />
                }
            />
            <Route
                path="/transactions/history/:transactionType"
                element={
                  <PrivateRoute
                      component={<div />}
                      redirectTo="/"
                  />
                }
            />
          </Route>
        </Routes>
      </>
  );
}

export default App;

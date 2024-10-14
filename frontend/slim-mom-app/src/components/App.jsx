import { Routes, Route } from 'react-router-dom';
//import { Home } from 'pages/Home';
import { SharedLayout } from './SharedLayout/SharedLayout';
import { Suspense, useEffect, lazy, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getToken } from 'redux/authSelectors';
import { useGetUserQuery } from 'redux/auth';
import { setCurrentUser } from 'redux/authSlice';
import { PrivateRoute } from './Routes/PrivateRoute';
import { PublicRoute } from './Routes/PublicRoute';
import { ThemeProvider } from 'styled-components';
import { theme, nightModeTheme } from './Theme/Theme';
import { ThemeContext } from './Context/Context';
import { DesktopApp } from './DesktopApp/DesktopApp';

const Login = lazy(() => import('../pages/LoginPage'));
const Register = lazy(() => import('../pages/RegisterPage'));
//const Diary = lazy(() => import('../pages/DiaryPage'));
//const Calculator = lazy(() => import('../pages/CalculatorPage'));
const NotFound = lazy(() => import('../pages/NotFound'));

export const App = () => {
  const { isTheme } = useContext(ThemeContext);
  const dailyRate = useSelector(state => state.auth.userInfo.dailyRate);

  const dispatch = useDispatch();
  const token = useSelector(getToken);

  const mockQuery = '';
  const { data } = useGetUserQuery(mockQuery, { skip: !token });

  useEffect(() => {
    if (!data) {
      return;
    }
    if (dailyRate) {
      return;
    }

    dispatch(setCurrentUser(data));
  }, [dailyRate, data, dispatch]);

  return (
    <ThemeProvider theme={isTheme ? theme : theme}>
      <Suspense>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            {/* <Route index element={<Navigate to="home" />} /> */}
            <Route
              index
              element={<PublicRoute restricted>{/*   <Home /> */}</PublicRoute>}
            />
            <Route
              path="login"
              element={
                <PublicRoute restricted>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="register"
              element={
                <PublicRoute restricted>
                  <Register />
                </PublicRoute>
              }
            />
            <Route
              path="diary"
              element={<PrivateRoute>{/*   <Diary /> */}</PrivateRoute>}
            />
            <Route
              path="calculator"
              element={<PrivateRoute>{/* <Calculator /> */}</PrivateRoute>}
            />
            <Route
              path="desktop"
              element={
                <PrivateRoute>
                  <DesktopApp />
                </PrivateRoute>
              }
            />
            <Route path="/*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </ThemeProvider>
  );
};

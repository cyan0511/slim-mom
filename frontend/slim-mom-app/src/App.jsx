// import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { SharedLayout } from './components/SharedLayout/SharedLayout';
import { RestrictedRoute } from './components/RestrictedRoute/RestrictedRoute';
import { lazy, useEffect } from 'react';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from './hooks/useAuth';
import * as auth from './redux/auth/authOperations';
import * as products from './redux/products/selectors';
import { Loader } from './components/Loader/Loader';
import { listDiaries } from './redux/diaries/operations';
import { listProducts } from './redux/products/operations';
import * as diaries from './redux/diaries/selectors';
import * as users from './redux/user/selectors';
import { getCurrentUser } from './redux/user/operations';

// import * as user from './redux/users/selectors';

const MainPage = lazy(() => import('./pages/MainPage/MainPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage/RegisterPage'));
const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage'));
const DiaryPage = lazy(() => import('./pages/DiaryPage/DiaryPage'));
const CalculatorPage = lazy(
    () => import('./pages/CalculatorPage/CalculatorPage'));

function App() {
  const dispatch = useDispatch();
  const { isLoggedIn, isRefreshing } = useAuth();
  // const diaryDate = useSelector(diaries.getDate);
  // const date = parse(diaryDate, 'dd.MM.yyyy', new Date());

  const isProductsLoading = useSelector(products.getIsLoading);
  const isDiariesLoading = useSelector(diaries.getIsLoading);
  const isUserLoading = useSelector(users.getIsLoading);

  const isLoading = isProductsLoading ||
      isDiariesLoading ||
      isUserLoading ||
      isRefreshing;

  useEffect(() => {
    if (!isLoggedIn) {
      dispatch(auth.refreshToken());
    } else {
      dispatch(getCurrentUser());
      dispatch(listProducts());
      dispatch(listDiaries(new Date()));
    }
  }, [dispatch, isLoggedIn]);

  return (
      <>
        {isLoading && <Loader/>}
        <Routes>
          <Route path="/" element={<SharedLayout/>}>
            <Route index element={<RestrictedRoute
                component={<MainPage/>}
                redirectTo="/diary"
            />}/>
            <Route
                path="/register"
                element={
                  <RestrictedRoute redirectTo="/" component={<RegisterPage/>}/>
                }
            />
            <Route
                path="/login"
                element={
                  <RestrictedRoute redirectTo="/" component={<LoginPage/>}/>
                }
            />
            {/* Protected routes (accessible only when logged in) */}
            <Route
                path="/calculator"
                element={
                  <PrivateRoute
                      component={<CalculatorPage/>}
                      redirectTo="/"
                  />
                }
            />
            <Route
                path="/diary"
                element={
                  <PrivateRoute
                      component={<DiaryPage/>}
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

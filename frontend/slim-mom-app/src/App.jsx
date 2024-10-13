// import logo from './logo.svg';
import './App.css';
import {Route, Routes} from "react-router-dom";
import {SharedLayout} from "./components/SharedLayout/SharedLayout";
import {RestrictedRoute} from "./components/RestrictedRoute/RestrictedRoute";
import {lazy, useEffect} from "react";
import {PrivateRoute} from "./components/PrivateRoute/PrivateRoute";
import {useDispatch} from "react-redux";
import {useAuth} from "./hooks/useAuth";
import auth from "./redux/auth/authSelectors";

const MainPage = lazy(() => import('./pages/MainPage/MainPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage/RegisterPage'));
const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage'));

function App() {
    const dispatch = useDispatch();
    const {isLoggedIn, token, refreshToken, isRefreshing} = useAuth();

    useEffect(() => {
        const checkAuthStatus = async () => {
            if (token && !isLoggedIn) {
                await dispatch(auth.refreshToken({ refreshToken })).unwrap();
            }

            if (isLoggedIn) {
                await dispatch(fetchCurrentUser());
            }
        };

        checkAuthStatus();
    }, [dispatch, token, isLoggedIn, sid]);


    return (
        <>
            {/*{ isLoading && <Loader /> }*/}
            <Routes>
                <Route path="/" element={<SharedLayout/>}>
                    <Route index element={<RestrictedRoute
                        component={<MainPage/>}
                        redirectTo="/diary"
                    />}/>
                    <Route
                        path="/signup"
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
                                component={<div>Calculator</div>}
                                redirectTo="/"
                            />
                        }
                    />
                    <Route
                        path="/diary"
                        element={
                            <PrivateRoute
                                component={<div>Diary</div>}
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

import { Outlet, useLocation } from 'react-router-dom';
import { Header } from '../Header/Header';
import { Suspense } from 'react';
import css from './SharedLayout.module.css';
import { useAuth } from '../../hooks/useAuth';

export const SharedLayout = () => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  const isSignInLogin = ['signup', 'login'].some(v => location.pathname.includes(v));

  return (
    <div className={css.container}>
      <Header />
      <div className={css.mainContainer}>
        {!isLoggedIn &&
          <div className={`${isSignInLogin ? css.hiddenImageWrapper : ''} ${css.imageWrapper}`}></div>}

        <div className={css.outlet}>
          <Suspense fallback={null}>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

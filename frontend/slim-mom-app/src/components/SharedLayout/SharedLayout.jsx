import { Outlet } from 'react-router-dom';
import { Header } from '../Header/Header';
import { Suspense, useState } from 'react';
import css from './SharedLayout.module.css';
import { useAuth } from '../../hooks/useAuth';
import { BgImages } from '../BgImages/BgImages';

export const SharedLayout = () => {
  const { isLoggedIn } = useAuth();
  const [openNavigation, setOpenNavigation] = useState(false);

  return (
    <div
      className={`${css.container} ${
        openNavigation ? css.backgroundActive : ''
      }`}
    >
      <Header
        setOpenNavigation={setOpenNavigation}
        openNavigation={openNavigation}
      />
      {!isLoggedIn && <BgImages />}
      <div className={css.mainContainer}>
        <div className={css.outlet}>
          <Suspense fallback={null}>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

import { useMediaQuery } from 'react-responsive';
import Navigation from '../Navigation/Navigation';

import { useAuth } from '../../hooks/useAuth';
import { NavLink } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { RxCross2 } from 'react-icons/rx';
import css from './Header.module.css';
import { Logo } from '../Logo/Logo';
import BottomSection from '../UserInfo/UserInfo';

export const Header = ({ setOpenNavigation, openNavigation }) => {
  const { user, isLoggedIn } = useAuth();
  const userName = user?.username;

  // Media queries for different screen sizes
  const isMobile = useMediaQuery({ query: '(max-width: 426px)' });
  const isTablet = useMediaQuery({
    query: '(min-width: 426px) and (max-width: 1023px)',
  });
  const isDesktop = useMediaQuery({ query: '(min-width: 1024px)' });

  const toggleNavigation = () => {
    setOpenNavigation(!openNavigation);
  };

  return (
    <>
      <header className={css.header}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? css.linkActive : css.link)}
        >
          <Logo />
        </NavLink>

        {isLoggedIn ? (
          <>
            {(isTablet || isDesktop || isMobile) && (
              <BottomSection name={userName} />
            )}

            {/* Show Navigation for Desktop */}
            {isDesktop && <Navigation openNavigation={true} />}

            {/* Hamburger menu for mobile */}
            {!isDesktop && (
              <>
                {openNavigation ? (
                  <RxCross2
                    className={css.menuIcon}
                    onClick={toggleNavigation}
                  />
                ) : (
                  <GiHamburgerMenu
                    className={css.menuIcon}
                    onClick={toggleNavigation}
                  />
                )}
                {openNavigation && (
                  <Navigation openNavigation={openNavigation} />
                )}
              </>
            )}
          </>
        ) : (
          isDesktop && <Navigation />
        )}
      </header>
      {isMobile && userName && <BottomSection name={userName} />}
    </>
  );
};

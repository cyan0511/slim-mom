import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { getUserName } from 'redux/authSelectors';
import Menu from './Navigation/Navigation';
import { BottomSection } from './UserInfo/UserInfo';
import { GiHamburgerMenu } from 'react-icons/gi';
import { RxCross2 } from 'react-icons/rx';
import logoMobile from '../../images/logo/logoMobile.png';
import logoMobileRetina from '../../images/logo/logoMobile@2x.png';
import logoTablet from '../../images/logo/logoTablet.png';
import logoTabletRetina from '../../images/logo/logoTablet@2x.png';
import logoDesktop from '../../images/logo/logoDesktop.png';
import logoDesktopRetina from '../../images/logo/logoDesktop@2x.png';
import './Header.css';

export const Header = () => {
  const [openNavigation, setOpenNavigation] = useState(false);
  const userName = useSelector(getUserName);
  const { pathname } = useLocation();

  const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' });
  const isMobile = useMediaQuery({ query: '(max-width: 426px)' });
  const isTablet = useMediaQuery({
    query: '(min-width: 426px) and (max-width: 1023px)',
  });
  const isDesktop = useMediaQuery({ query: '(min-width: 1024px)' });

  const takeLogo = () => {
    if (isMobile) {
      return isRetina ? logoMobileRetina : logoMobile;
    } else if (isTablet) {
      return isRetina ? logoTabletRetina : logoTablet;
    } else if (isDesktop) {
      return isRetina ? logoDesktopRetina : logoDesktop;
    }
  };

  return (
    <>
      <header className="header-styled">
        <Link to="/">
          <img className="logo" src={takeLogo()} alt="Logo" />
        </Link>

        {userName ? (
          <>
            {isTablet && <BottomSection name={userName} />}
            {isDesktop && (
              <>
                <Menu setOpenNavigation={setOpenNavigation} />
                <BottomSection name={userName} />
              </>
            )}
            {!isDesktop && (
              <>
                {openNavigation ? (
                  <RxCross2
                    className="menu-icon"
                    onClick={() => setOpenNavigation(false)}
                  />
                ) : (
                  <GiHamburgerMenu
                    className="menu-icon"
                    onClick={() => setOpenNavigation(true)}
                  />
                )}
                {openNavigation && (
                  <Menu setOpenNavigation={setOpenNavigation} />
                )}
              </>
            )}
          </>
        ) : (pathname === '/register' || pathname === '/login') &&
          isDesktop ? null : (
          <ul className="btn-list">
            <li>
              <Link className="styled-link" to="login">
                Log in
              </Link>
            </li>
            <li>
              <Link className="styled-link" to="register">
                Registration
              </Link>
            </li>
          </ul>
        )}
      </header>
      {isMobile && userName && <BottomSection name={userName} />}
    </>
  );
};

export default Header;

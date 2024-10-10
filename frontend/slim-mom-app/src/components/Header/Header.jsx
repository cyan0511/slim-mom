import { Navigation } from "../Navigation/Navigation";
import { useAuth } from "../../hooks/useAuth";
import css from "./Header.module.css";
import { NavLink } from "react-router-dom";
import { Logo } from "../Logo/Logo";
import { AuthNav } from "../AuthNav/AuthNav";
import BurgerBtn from "./BurgerBtn/BurgerBtn";
import BurgerNav from "./BurgerNav/BurgerNav";
import { useState } from "react";

export const Header = () => {
  const { isLoggedIn } = useAuth();
  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <header className={isLoggedIn ? css.authHeader : css.header}>
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? css.linkActive : css.link)}
      >
        <Logo />
      </NavLink>

      {isLoggedIn && (
        <>
          <Navigation className={css.navigation} />
          <div className={css.burgerNav}>
            <BurgerBtn onClick={handleMenuToggle} isOpen={isMenuOpen} />
            {isMenuOpen && (
              <BurgerNav onClick={handleMenuToggle} userId="yourUserId" />
            )}
          </div>
        </>
      )}
      {isLoggedIn ? <div>logged in</div> : <AuthNav />}
    </header>
  );
};

import {useAuth} from '../../hooks/useAuth';
import css from './Navigation.module.css';
import {MenuNav} from "../MenuNav/MenuNav";
import {AuthNav} from "../AuthNav/AuthNav";


export const Navigation = ({className, activeClass}) => {
    const {isLoggedIn} = useAuth();

    return (
        <nav className={css.navbar}>
            {isLoggedIn ?
                <MenuNav className={className} activeClass={activeClass}/>
                : <AuthNav/>
            }
        </nav>
    );
};

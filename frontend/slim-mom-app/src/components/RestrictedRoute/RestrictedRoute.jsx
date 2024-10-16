import { useAuth } from '../../hooks/useAuth';
import { Navigate } from 'react-router-dom';

/**
 * - If the route is restricted and the user is logged in, render a <Navigate> to redirectTo
 * - Otherwise render the component
 */

export const RestrictedRoute = ({ component: Component, redirectTo = '/' }) => {
  // colon: giving a new name
  // =: setting a default value
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? <Navigate to={redirectTo} /> : Component;
};

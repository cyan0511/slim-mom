import { useSelector } from 'react-redux';
import * as auth from '../redux/auth/authSelectors';

export const useAuth = () => {
  const isLoggedIn = useSelector(auth.isLoggedIn);
  const isRefreshing = useSelector(auth.isRefreshing);
  const user = useSelector(auth.user);
  const accessToken = useSelector(auth.accessToken);
  const refreshToken = useSelector(auth.refreshToken);

  return {
    isLoggedIn,
    isRefreshing,
    user,
    accessToken,
    refreshToken
  };
};

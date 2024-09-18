import { useSelector } from 'react-redux';
import * as auth from '../redux/auth/authSelectors';

export const useAuth = () => {
  const isLoggedIn = useSelector(auth.isLoggedIn);
  const isRefreshing = useSelector(auth.isRefreshing);
  const user = useSelector(auth.user);
  const token = useSelector(auth.token);
  const refreshToken = useSelector(auth.refreshToken);
  const sid = useSelector(auth.sid);

  return {
    isLoggedIn,
    isRefreshing,
    user,
    token,
    refreshToken,
    sid,
  };
};

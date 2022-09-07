import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LOGIN_PAGE } from '../constants/routes';
import { selectAuth } from '../slices/authSlice';

interface AuthorizedRouteProps {
  children: JSX.Element;
}

export default function AuthorizedRoute(props: AuthorizedRouteProps) {
  const { children } = props;

  const { token } = useSelector(selectAuth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate(LOGIN_PAGE);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return children;
}

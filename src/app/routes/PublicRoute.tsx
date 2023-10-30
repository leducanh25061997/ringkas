import { shallowEqual, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { selectAuth } from 'app/pages/Login/slice/selectors';

import path from './path';

export default function PublicRoute({ children }: { children: JSX.Element }) {
  const { authStatus } = useSelector(selectAuth, shallowEqual);

  if (authStatus === 'CHECKING') {
    return null;
  }
  if (authStatus === 'AUTH') {
    return <Navigate to={path.root} replace />;
  }

  return children;
}

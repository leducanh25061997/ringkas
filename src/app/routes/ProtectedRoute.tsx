import { shallowEqual, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { selectAuth } from 'app/pages/Login/slice/selectors';

import NoPermission from '../components/NoPermission';
import MainLayout from '../components/Layouts/MainLayout';

import path, { permissionPathConfig } from './path';

export default function ProtectedRoute({
  children,
  pathPattern,
  token,
}: {
  children: JSX.Element;
  pathPattern: string;
  token?: string;
}) {
  const { authStatus, userInformation } = useSelector(selectAuth, shallowEqual);

  if (authStatus === 'CHECKING') {
    return null;
  }
  if (authStatus === 'UN_AUTH' && !token) {
    return <Navigate to={path.login} replace />;
  }
  if (pathPattern === path.root) {
    return children;
  }
  if (
    userInformation?.permissions.includes(permissionPathConfig[pathPattern])
  ) {
    return children;
  }

  return (
    <MainLayout>
      <NoPermission />
    </MainLayout>
  );
}

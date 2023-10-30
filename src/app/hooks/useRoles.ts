import { selectAuth } from 'app/pages/Login/slice/selectors';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

export default function useRoles() {
  const { userInformation } = useSelector(selectAuth);

  const role = useMemo(() => {
    const roleRaw = userInformation?.roles[0] || '';

    switch (roleRaw.split('/')[2]) {
      case 'Ringkas':
        return 'admin';
      case 'Developer':
        return 'developer';
      case 'Bank Partner':
        return 'bank';
      case 'Client':
        return 'client';
      default:
        return;
    }
  }, [userInformation]);
  return role;
}

import useRoles from 'app/hooks/useRoles';
import React from 'react';
import CustomerDetails from './CustomerDetails';

interface Props {}

const CustomerInformation = React.memo((props: Props) => {
  const role = useRoles();
  if (!role) return null;
  return <CustomerDetails />;
});

export default CustomerInformation;

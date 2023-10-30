import { selectAuth } from 'app/pages/Login/slice/selectors';
import { useSelector } from 'react-redux';
import EmployeeAccountManagementByAdmin from './Admin/EmployeeAccountManagementByAdmin';
import EmployeeAccountManagement from './Developer/EmployeeAccountManagement';

export default function EmployeeAccountList() {
  const { userInformation } = useSelector(selectAuth);

  if (
    userInformation &&
    userInformation?.roles &&
    userInformation?.roles.length > 0
  ) {
    if (userInformation?.roles[0].startsWith('/Console Admin/Ringkas/')) {
      return <EmployeeAccountManagementByAdmin />;
    }
    if (userInformation?.roles[0].startsWith('/Console Admin/Developer')) {
      return <EmployeeAccountManagement />;
    }
  }
  return <div />;
}

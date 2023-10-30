import { Buffer } from 'buffer';
import qs from 'query-string';

import MainLayout from 'app/components/Layouts/MainLayout';
import ProductManagement from 'app/pages/InventoryManagement/Products/ProductManagement';
import CreateProject from 'app/pages/InventoryManagement/ProjectManagement/CreateProject';
import { ProjectManagement } from 'app/pages/InventoryManagement/ProjectManagement/Project/Loadable';
import ProjectInformation from 'app/pages/InventoryManagement/ProjectManagement/ProjectInformation';
import UpdateProject from 'app/pages/InventoryManagement/ProjectManagement/UpdateProject';
import Login from 'app/pages/Login';
import { useAuthSlice } from 'app/pages/Login/slice';
import BankAccount from 'app/pages/ManageUsers/BankAccount';
import CreateBranchBankAccount from 'app/pages/ManageUsers/BankAccount/BranchBankPartnerManagement/CreateBranchBankAccount';
import CreateHqBankAccount from 'app/pages/ManageUsers/BankAccount/HQBankPartnerManagement/CreateHqBankAccount';
import { HQBankAccountEdit } from 'app/pages/ManageUsers/BankAccount/HQBankPartnerManagement/HQBankAccountEdit/Loadable';
import HQBankAccountInformation from 'app/pages/ManageUsers/BankAccount/HQBankPartnerManagement/HQBankAccountInformation';
import CustomerAccountList from 'app/pages/ManageUsers/CustomerAccount/ListCustomer';
import PreKprVerification from 'app/pages/ManageUsers/CustomerAccount/PreKprVerification';
import CustomerScoringReady from 'app/pages/ManageUsers/CustomerAccount/ScoringReady';
import CustomerAccountEdit from 'app/pages/ManageUsers/CustomerAccountEdit';
import DeveloperAccountCreate from 'app/pages/ManageUsers/DeveloperAccount/DeveloperAccountCreate';
import EditCustomer from 'app/pages/ManageUsers/DeveloperAccount/DeveloperAccountEdit';
import DeveloperAccountInformation from 'app/pages/ManageUsers/DeveloperAccount/DeveloperAccountInformation';
import DeveloperAccount from 'app/pages/ManageUsers/DeveloperAccount/DeveloperAccountManagement';
import CreatePartnerAccount from 'app/pages/ManageUsers/PartnerAccount/CreatePartnerAccount';
import PartnerAccountManagement from 'app/pages/ManageUsers/PartnerAccount/PartnerAccountManagement';
import NotFound from 'app/pages/NotFound';
import RegisterPage from 'app/pages/Register';
import RegisterDeveloper from 'app/pages/Register/RegisterDeveloper';
import SuccessfulAccountRegistration from 'app/pages/Register/Components/Successful';
import RegisterBranchBank from 'app/pages/Register/RegisterBank/Branch';
import RegisterHeadquarterBank from 'app/pages/Register/RegisterBankHQ';
import RegisterPartner from 'app/pages/Register/RegisterPartner';
import React, { useEffect, useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import ImageAndVideo from '../pages/InventoryManagement/ImageAndVideo';
import BankBranchEdit from '../pages/ManageUsers/BankBranchEdit';
import BankInformation from '../pages/ManageUsers/BankInformation';
import PartnerAccountEdit from '../pages/ManageUsers/PartnerAccountEdit';
import PartnerInformation from '../pages/ManageUsers/PartnerInfomation';

import ChangePassword from 'app/pages/Login/ChangePassword';
import NotValidEmail from 'app/pages/Login/NotValidEmail';
import UpdatePassword from 'app/pages/Login/UpdatePassword';
import CustomerInformation from 'app/pages/ManageUsers/CustomerAccount/CustomerInformation';
import path from './path';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';
import KprRegister from '../pages/ManageUsers/CustomerAccount/KprRegister';

// Product
import ProductBulkUpload from 'app/pages/InventoryManagement/Products/BulkUpload';
import ProjectTask from 'app/pages/InventoryManagement/ProjectManagement/UpdateProject/ProjectTask';
import CreateCustomer from 'app/pages/ManageUsers/CustomerAccount/CreateCustomer';
import CustomerSlikDetails from 'app/pages/ManageUsers/CustomerAccount/CustomerInformation/SlikDetails';
import DeveloperWorkspace from 'app/pages/ManageUsers/CustomerAccount/CustomerPipeline/DeveloperWorkspace';
import PartnerDataVerification from 'app/pages/ManageUsers/PartnerAccount/PartnerDataVerification';
import CreateProduct from '../pages/InventoryManagement/Products/CreateProduct';
import ProductEdit from '../pages/InventoryManagement/Products/ProductEdit';
import ProductInformation from '../pages/InventoryManagement/Products/ProductInformation';
// import CustomerPipeline from 'app/pages/ManageUsers/CustomerPipeline/CustomerPipeline';
import ButtonContactUs from 'app/components/ButtonContactUs';
import CreateKPRProgram from 'app/pages/BankProgram/KPRProgram/CreateKPRProgram';
import { KPRProgramList } from 'app/pages/BankProgram/KPRProgram/KPRProgramList/Loadable';
import SetPassword from 'app/pages/Login/SetPassword';
import BankTasks from 'app/pages/ManageUsers/BankAccount/BankTasks';
import EmployeeAccount from 'app/pages/ManageUsers/EmployeeAccount';
import CreateEmployeeAccountByAdmin from 'app/pages/ManageUsers/EmployeeAccount/Admin/CreateEmployeeAccountByAdmin';
import EmployeeInformationByAdmin from 'app/pages/ManageUsers/EmployeeAccount/Admin/EmployeeInformationByAdmin';
import UpdateEmployeeAccountByAdmin from 'app/pages/ManageUsers/EmployeeAccount/Admin/UpdateEmployeeAccountByAdmin';
import UpdateEmployeeAccount from 'app/pages/ManageUsers/EmployeeAccount/Developer//UpdateEmployeeAccount';
import CreateEmployeeAccount from 'app/pages/ManageUsers/EmployeeAccount/Developer/CreateEmployeeAccount';
import EmployeeInformation from 'app/pages/ManageUsers/EmployeeAccount/Developer/EmployeeInformation';
import { RegisterNewClient } from 'app/pages/ManageUsers/PartnerAccount/RegisterNewClient/Loadable';
import { RegisterNewBankHQ } from 'app/pages/ManageUsers/BankAccount/HQBankPartnerManagement/RegisterBankHQ/Loadable';
import { RegisterNewDeveloper } from 'app/pages/ManageUsers/DeveloperAccount/RegisterNewDeveloper/Loadable';
import { PartnerDetails } from 'app/pages/ManageUsers/PartnerAccount/PartnerDetails';

const publicRoutes = [
  { path: path.login, component: <Login />, layout: null },
  { path: path.register, component: <RegisterPage /> },
  { path: path.registerDeveloper, component: <RegisterDeveloper /> },
  {
    path: path.registerHeadquarterBank,
    component: <RegisterHeadquarterBank />,
  },
  {
    path: path.registerBranchBank,
    component: <RegisterBranchBank />,
  },
  { path: path.registerAgen, component: <div>agen</div> },
  { path: path.registerPartner, component: <RegisterPartner /> },
  {
    path: path.successfulAccountRegistration,
    component: <SuccessfulAccountRegistration />,
  },
  {
    path: path.changePassword,
    component: <ChangePassword />,
  },
  {
    path: path.checkResetLink,
    component: <NotValidEmail />,
  },
];

const protectedRoutes = [
  {
    path: path.root,
    component: <Navigate to={path.customerAccountList} />,
    layout: MainLayout,
  },
  { path: path.project, component: <ProjectManagement /> },
  { path: path.createProject, component: <CreateProject /> },
  { path: path.updateProject, component: <UpdateProject /> },
  { path: path.detailProject, component: <ProjectInformation /> },
  { path: path.updateProjectTask, component: <ProjectTask /> },

  { path: path.imgAndVideoList, component: <ImageAndVideo /> },

  { path: path.productList, component: <ProductManagement /> },
  { path: path.createProduct, component: <CreateProduct /> },
  { path: path.productInformation, component: <ProductInformation /> },
  { path: path.updateProduct, component: <ProductEdit /> },
  { path: path.productBulkUpload, component: <ProductBulkUpload /> },

  { path: path.customerAccountList, component: <CustomerAccountList /> },
  { path: path.verifyCustomer, component: <PreKprVerification /> },
  { path: path.detailCustomer, component: <CustomerInformation /> },
  { path: path.createCustomerAccount, component: <CreateCustomer /> },
  { path: path.updateCustomerAccount, component: <CustomerAccountEdit /> },
  { path: path.customerScoringReady, component: <CustomerScoringReady /> },
  { path: path.detailCustomerSlik, component: <CustomerSlikDetails /> },

  { path: path.developerAccountEdit, component: <EditCustomer /> },
  { path: path.developerAccountList, component: <DeveloperAccount /> },
  { path: path.createDeveloper, component: <DeveloperAccountCreate /> },
  { path: path.developerTasks, component: <DeveloperWorkspace /> },
  { path: path.kprRegister, component: <KprRegister /> },
  {
    path: path.detailDeveloperAccount,
    component: <DeveloperAccountInformation />,
  },

  //bank
  { path: path.bankAccountList, component: <BankAccount /> },
  { path: path.detailBankAccount, component: <BankInformation /> },
  { path: path.updateBankBranchAccount, component: <BankBranchEdit /> },
  {
    path: path.createHqBankAccount,
    component: <CreateHqBankAccount />,
  },
  {
    path: path.createBranchBankAccount,
    component: <CreateBranchBankAccount />,
  },
  {
    path: path.hqBankAccountInformation,
    component: <HQBankAccountInformation />,
  },
  {
    path: path.updateHQBankAccount,
    component: <HQBankAccountEdit />,
  },
  { path: path.bankTasks, component: <BankTasks /> },

  {
    path: path.partnerAccountList,
    component: <PartnerAccountManagement />,
  },
  {
    path: path.partnerAccountInformation,
    component: <PartnerDetails />,
  },
  {
    path: path.createPartnerAccount,
    component: <CreatePartnerAccount />,
  },
  {
    path: path.updatePartnerAccount,
    component: <PartnerAccountEdit />,
  },
  {
    path: path.partnerDataVerification,
    component: <PartnerDataVerification />,
  },
  {
    path: path.kprProgram,
    component: <KPRProgramList />,
  },
  {
    path: path.createKprProgram,
    component: <CreateKPRProgram />,
  },
  {
    path: path.employeeAccountList,
    component: <EmployeeAccount />,
  },
  {
    path: path.createEmployeeAccount,
    component: <CreateEmployeeAccount />,
  },
  {
    path: path.detailEmployeeAccount,
    component: <EmployeeInformation />,
  },
  {
    path: path.updateEmployeeAccount,
    component: <UpdateEmployeeAccount />,
  },
  {
    path: path.employeeAccountListByAdmin,
    component: <EmployeeAccount />,
  },
  {
    path: path.createEmployeeAccountByAdmin,
    component: <CreateEmployeeAccountByAdmin />,
  },
  {
    path: path.detailEmployeeAccountByAdmin,
    component: <EmployeeInformationByAdmin />,
  },
  {
    path: path.updateEmployeeAccountByAdmin,
    component: <UpdateEmployeeAccountByAdmin />,
  },
  {
    path: path.registerNewPartnerClient,
    component: <RegisterNewClient />,
  },
  {
    path: path.registerNewPartnerBankHq,
    component: <RegisterNewBankHQ />,
  },
  {
    path: path.registerNewPartnerDeveloper,
    component: <RegisterNewDeveloper />,
  },
];

export default function Router() {
  const dispatch = useDispatch();
  const { actions } = useAuthSlice();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const location = useLocation();

  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    dispatch(actions.getUserInformation());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (token) {
      const tokenDecoded = qs.parse(
        Buffer.from(token || '', 'base64').toString(),
      );
      const username =
        (tokenDecoded.username &&
          (tokenDecoded.username as string).replaceAll(' ', '+')) ||
        '';
      const OTP = (tokenDecoded?.otp as string) || '';
      const TYPE = (tokenDecoded?.type as string) || '';

      dispatch(
        actions.loginWithResetPassword(
          { otp: OTP, username },
          () => {
            if (TYPE === 'LINK_SET_1ST_PASSWORD') {
              navigate(path.setPassword);
            } else {
              navigate(path.updatePassword);
            }
          },
          _ => {
            if (TYPE !== 'LINK_SET_1ST_PASSWORD') {
              navigate(path.checkResetLink, { state: username });
            }
          },
        ),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <Routes>
      {protectedRoutes.map(route => {
        const Layout = route.layout || MainLayout;
        return (
          <Route
            key={route.path}
            path={route.path}
            element={
              <ProtectedRoute pathPattern={route.path} token={token || ''}>
                <Layout>
                  <div>
                    <div>{route.component}</div>
                    <ButtonContactUs />
                  </div>
                </Layout>
              </ProtectedRoute>
            }
          />
        );
      })}
      {publicRoutes.map(route => {
        const Layout = route.layout || React.Fragment;
        return (
          <Route
            key={route.path}
            path={route.path}
            element={
              <PublicRoute>
                <Layout>{route.component}</Layout>
              </PublicRoute>
            }
          />
        );
      })}
      <Route path={path.setPassword} element={<SetPassword />} />
      <Route path={path.updatePassword} element={<UpdatePassword />} />
      <Route path={path.notFound} element={<NotFound />} />
      <Route path={path.all} element={<NotFound />} />
    </Routes>
  );
}

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import BreadCrumbs from 'app/components/BreadCrumbs';
import path from 'app/routes/path';
import { translations } from 'locales/translations';
import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';
import styled from 'styled-components';
import { Footer } from './components/Footer';
import backIcon from 'assets/icons/back-blue.svg';
import { EmployeeAccountForm } from './components/EmployeeAccountForm';
import { PHONE_NUMBER } from 'utils/helpers/regex';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useEmployeeAccountManagementSlice } from '../slice';
import { selectEmployeeAccountList } from '../slice/selectors';
import {
  EmployeeAccountDataForm,
  EmployeeType,
  RoleName,
} from 'types/EmployeeAccountManagement';
import { selectAuth } from 'app/pages/Login/slice/selectors';

const RootContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: #f0f4f9;
  & .MuiInputLabel-root {
    color: #919eab;
  }
`;

const Header = styled.div`
  font-size: 14px;
  line-height: 21px;
  padding: 24px 24px 0px 24px;
  .parent-label {
    color: #005fc5;
  }
`;

export default function UpdateEmployeeAccountByAdmin() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { actions } = useEmployeeAccountManagementSlice();
  const params = useParams();
  const { id } = params;
  const { employeeAccountInfo, isLoading } = useSelector(
    selectEmployeeAccountList,
    shallowEqual,
  );
  const links = React.useMemo(
    () => [
      {
        title: t(translations.common.manageUsers),
        path: path.manageUsers,
      },
      {
        title: t(translations.sidebar.administration),
        path: path.employeeAccountList,
      },
      {
        title: t(translations.employManagement.employeeDetails),
        path: `${path.employeeAccountList}/${id}`,
      },
      {
        title: t(translations.employManagement.updateEmployee),
      },
    ],
    [t],
  );

  const validateForm = yup.object().shape({
    email: yup
      .string()
      .required(t(translations.createProductError.pleaseEnterRequiredFields))
      .email(t(translations.required.invalidEmail))
      .nullable(),
    fullName: yup
      .string()
      .required(t(translations.createProductError.pleaseEnterRequiredFields)),
    phone: yup
      .string()
      .matches(PHONE_NUMBER, t(translations.required.invalidPhoneNumber))
      .required(t(translations.createProductError.pleaseEnterRequiredFields))
      .nullable(),
  });

  const methods = useForm<EmployeeAccountDataForm>({
    resolver: yupResolver(validateForm),
  });

  const handleBack = () => {
    navigate(`${path.employeeAccountListByAdmin}/${id}`);
  };

  React.useEffect(() => {
    if (!id) return;
    dispatch(actions.fetchEmployeeAccountInfo(id));
  }, []);

  const onSubmit = (inputData: EmployeeAccountDataForm) => {
    if (inputData.roleNameData?.value) {
      inputData.role = inputData.roleNameData.value;
      delete inputData.roleNameData;
    }
    inputData.id = id;
    dispatch(
      actions.updateEmployeeAccount({
        formData: inputData,
        navigate,
      }),
    );
  };

  useEffect(() => {
    if (employeeAccountInfo) {
      methods.setValue('email', employeeAccountInfo.email);
      methods.setValue('fullName', employeeAccountInfo.fullName);
      methods.setValue('phone', employeeAccountInfo.phone);
      let roleName = undefined;
      if (employeeAccountInfo.role === RoleName.ADMIN_RINGKAS) {
        roleName = {
          label: t(translations.roles.adminRingkas),
          value: RoleName.ADMIN_RINGKAS,
        };
      }
      if (employeeAccountInfo.role === RoleName.CREDIT_OFFICER_RINGKAS) {
        roleName = {
          label: t(translations.roles.creditOfficer),
          value: RoleName.CREDIT_OFFICER_RINGKAS,
        };
      }
      methods.setValue('roleNameData', roleName);
    }
  }, [employeeAccountInfo]);

  return (
    <RootContainer>
      <div className="mb-4 flex items-center mx-8 mt-4">
        <div
          className="py-[10px] px-6 text-[#005FC5] leading-7 cursor-pointer bg-white rounded-lg flex items-center"
          onClick={handleBack}
        >
          <img src={backIcon} width={16} height={16} className="mr-2" alt="" />
          <p className="font-semibold">{t(translations.common.back)}</p>
        </div>
        <Header>
          <BreadCrumbs links={links} />
        </Header>
      </div>
      <FormProvider {...methods}>
        <form
          style={{ width: '100%' }}
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <EmployeeAccountForm />
          <Footer
            handleSubmit={methods.handleSubmit(onSubmit)}
            handleBack={handleBack}
            isLoading={isLoading}
          />
        </form>
      </FormProvider>
    </RootContainer>
  );
}

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import BreadCrumbs from 'app/components/BreadCrumbs';
import path from 'app/routes/path';
import { translations } from 'locales/translations';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';
import styled from 'styled-components';
import ButtonContactUs from 'app/components/ButtonContactUs';
import backIcon from 'assets/icons/back-blue.svg';
import { EmployeeDetailsSummary } from './components/EmployeeDetailsSummary';
import { HistoryLog } from './components/HistoryLog';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useEmployeeAccountManagementSlice } from '../slice';

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

export default function CreateEmployeeAccount() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { actions } = useEmployeeAccountManagementSlice();
  const params = useParams();
  const { id } = params;
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
      },
    ],
    [t],
  );

  const handleBack = () => {
    navigate(path.employeeAccountList);
  };

  const validateForm = yup.object().shape({});

  const methods = useForm<any>({
    resolver: yupResolver(validateForm),
  });

  React.useEffect(() => {
    if (!id) return;
    dispatch(actions.fetchEmployeeAccountInfo(id));
  }, []);

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
      <EmployeeDetailsSummary />
      <FormProvider {...methods}>
        <form style={{ width: '100%' }}>
          <HistoryLog />
        </form>
      </FormProvider>
      {/* <ButtonContactUs className="right-20" /> */}
    </RootContainer>
  );
}

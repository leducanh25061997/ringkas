import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import BreadCrumbs from 'app/components/BreadCrumbs';
import path from 'app/routes/path';
import { translations } from 'locales/translations';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { FormProvider, useForm } from 'react-hook-form';
import { Footer } from './conponents/Footer';
import { KPRProgramForm } from './conponents/KPRProgramForm';
import { BankLoanForm } from 'types/BankLoanManagement';
import { useKprProgramManagementSlice } from '../KPRProgramList/slice';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { selectKprProgramList } from '../KPRProgramList/slice/selectors';
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

export default function CreateKPRProgram() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { actions } = useKprProgramManagementSlice();
  const { isLoading } = useSelector(selectKprProgramList);
  const { userInformation } = useSelector(selectAuth, shallowEqual);
  const dispatch = useDispatch();
  const links = React.useMemo(
    () => [
      {
        title: t(translations.sidebar.bankProgram),
        path: path.bankProgram,
      },
      {
        title: t(translations.sidebar.kprProgram),
        path: path.kprProgram,
      },
      {
        title: t(translations.kprProgram.createKprProgram),
      },
    ],
    [t],
  );

  const handleBack = () => {
    navigate(path.kprProgram);
  };

  const validateForm = yup.object().shape({
    programName: yup
      .string()
      .required(t(translations.createProductError.pleaseEnterRequiredFields)),
    maxAmount: yup
      .string()
      .required(t(translations.createProductError.pleaseEnterRequiredFields)),
    fixedYear: yup
      .string()
      .required(t(translations.createProductError.pleaseEnterRequiredFields)),
    fixedRate: yup.lazy(value =>
      value === ''
        ? yup
            .string()
            .required(
              t(translations.createProductError.pleaseEnterRequiredFields),
            )
        : yup
            .number()
            .max(999.99, 'Max is 999.99')
            .required(
              t(translations.createProductError.pleaseEnterRequiredFields),
            ),
    ),
    tenor: yup
      .string()
      .required(t(translations.createProductError.pleaseEnterRequiredFields)),
    floatRate: yup.lazy(value =>
      value === ''
        ? yup
            .string()
            .required(
              t(translations.createProductError.pleaseEnterRequiredFields),
            )
        : yup
            .number()
            .max(999.99, 'Max is 999.99')
            .required(
              t(translations.createProductError.pleaseEnterRequiredFields),
            ),
    ),
    programDuration: yup.object().shape({
      startDate: yup.lazy(value =>
        value === '' || value == null || value.toString() !== 'Invalid Date'
          ? yup
              .string()
              .required(
                t(translations.createProductError.pleaseEnterRequiredFields),
              )
              .nullable()
          : yup
              .date()
              .typeError(t(translations.common.invalidDate))
              .required(
                t(translations.createProductError.pleaseEnterRequiredFields),
              ),
      ),
      endDate: yup.lazy(value =>
        value === '' || value == null
          ? yup
              .string()
              .required(
                t(translations.createProductError.pleaseEnterRequiredFields),
              )
              .nullable()
          : yup
              .date()
              .typeError(t(translations.common.invalidDate))
              .when('startDate', (st: any) => {
                if (st)
                  return yup
                    .date()
                    .typeError(t(translations.common.invalidDate))
                    .min(
                      st || 0,
                      t(translations.common.mustBeGreaterThan, {
                        startDate: 'End Date',
                        endDate: 'Start Date',
                      }),
                    );
                else
                  return yup
                    .date()
                    .typeError(t(translations.common.invalidDate))
                    .required(t(translations.common.invalidDate));
              })
              .required(t(translations.common.invalidDate)),
      ),
    }),
  });

  const methods = useForm<any>({
    resolver: yupResolver(validateForm),
  });

  const onSubmit = (inputData: BankLoanForm) => {
    if (userInformation?.userUuid) {
      inputData.uuid = userInformation?.userUuid;
    }
    dispatch(
      actions.createKprProgram({
        formData: inputData,
        navigate,
      }),
    );
  };

  return (
    <RootContainer>
      <Header>
        <BreadCrumbs links={links} />
      </Header>
      <FormProvider {...methods}>
        <form
          style={{ width: '100%' }}
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <KPRProgramForm />
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

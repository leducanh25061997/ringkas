import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import { TabPanel } from 'app/components/TabPanel';
import { translations } from 'locales/translations';
import React, { memo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { DeveloperAccountList } from 'types/DeveloperAccountManagement';

import CustomTabs from 'app/components/CustomTabs';

import { BankAccountInfo } from 'types/BankAccountManagement';

import { AccountInformation } from './AccountInformation';
import { CompanyInformation } from './CompanyInformation';
import { DocumentQualification } from './DocumentQualification';
import { KYC } from './KYC';
import { HistoryLog } from './HistoryLog';

interface Props {
  hqBankAccountInfo?: BankAccountInfo;
  step: number;
  setStep: (value: number) => void;
}

export const HQBankInputForm = memo((props: Props) => {
  const { hqBankAccountInfo, step, setStep } = props;
  const { t } = useTranslation();

  const handleChange = (event: any, newValue: number) => {
    setStep(newValue);
  };

  const validateForm = yup.object().shape({});

  const methods = useForm<any>({
    resolver: yupResolver(validateForm),
  });

  const sidebar = React.useMemo(
    () => [
      {
        key: 0,
        title: t(translations.developerInformation.accountInformation),
        component: <AccountInformation hqBankAccountInfo={hqBankAccountInfo} />,
      },
      {
        key: 1,
        title: 'KYC',
        component: <KYC hqBankAccountInfo={hqBankAccountInfo} />,
      },
      {
        key: 2,
        title: t(translations.developerInformation.companyInformation),
        component: <CompanyInformation hqBankAccountInfo={hqBankAccountInfo} />,
      },
      {
        key: 3,
        title: t(translations.developerInformation.documentQualification),
        component: (
          <DocumentQualification hqBankAccountInfo={hqBankAccountInfo} />
        ),
      },
      {
        key: 4,
        title: t(translations.developerInformation.historyLog),
        component: <HistoryLog />,
      },
    ],
    [hqBankAccountInfo],
  );

  return <CustomTabs sidebar={sidebar} step={step} setStep={setStep} />;
});

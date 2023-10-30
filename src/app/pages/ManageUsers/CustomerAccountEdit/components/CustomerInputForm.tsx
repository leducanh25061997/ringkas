import { Box } from '@mui/material';
import CustomTabs from 'app/components/CustomTabs';
import { translations } from 'locales/translations';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { selectCustomerInformation } from '../slice/selectors';
import { Images, ImagesOfKyc } from '../slice/types';

import { CustomerInformation } from './CustomerInformation';
import { Deposit } from './Deposit';
import { HistoryLog } from './HistoryLog';
import { KYCInformation } from './KYCInformation';
import { Asset } from './MortgageInformation/Asset';
import { BankRelation } from './MortgageInformation/BankRelation';
import { EmploymentData } from './MortgageInformation/EmploymentData';
import { Income } from './MortgageInformation/Income';
import { PersonalData } from './MortgageInformation/PersonalData';
import { Postscript } from './MortgageInformation/Postscript';
import { Warrantor } from './MortgageInformation/Warrantor';
import { Scoring } from './Scoring';
import { SLIKInformation } from './SLIKInformation';

interface Props {
  stepCustomer: number;
  images: Images;
  setImages: (value: Images) => void;
  setStepCustomer: (value: number) => void;
  setImagesOfKyc: (value: ImagesOfKyc) => void;
  imagesOfKyc: ImagesOfKyc;
}

export const CustomerInputForm = memo((props: Props) => {
  const {
    stepCustomer,
    setImagesOfKyc,
    imagesOfKyc,
    setStepCustomer,
    setImages,
    images,
  } = props;
  const { t } = useTranslation();
  const [open, setOpen] = React.useState<boolean>(false);

  const {
    customerInformation,
    customerKycInformation,
    customerKprInformation,
  } = useSelector(selectCustomerInformation);

  const sidebar = React.useMemo(
    () => [
      {
        key: 0,
        title: t(translations.customerAccountManagement.accountInformation),
        component: (
          <CustomerInformation customerInformation={customerInformation} />
        ),
      },
      {
        key: 1,
        title: t(translations.customerAccountManagement.kycInformation),
        component: (
          <KYCInformation
            customerKycInformation={customerKycInformation}
            setImages={setImagesOfKyc}
            images={imagesOfKyc}
          />
        ),
      },
      {
        key: 2,
        title: t(translations.customerAccountManagement.slikInfo),
        component: <SLIKInformation />,
      },
      {
        key: 3,
        title: t(translations.customerAccountManagement.mortgageInformation),
        children: [
          {
            title: t(translations.customerAccountManagement.personalData),
            component: (
              <PersonalData
                customerKprInformation={customerKprInformation}
                setImages={setImages}
                images={images}
              />
            ),
            key: 4,
          },
          {
            title: t(translations.customerAccountManagement.employmentData),
            component: (
              <EmploymentData customerKprInformation={customerKprInformation} />
            ),
            key: 5,
          },
          {
            title: t(translations.customerAccountManagement.warrantor),
            component: (
              <Warrantor customerKprInformation={customerKprInformation} />
            ),
            key: 6,
          },
          {
            title: t(translations.customerAccountManagement.asset),
            component: (
              <Asset customerKprInformation={customerKprInformation} />
            ),
            key: 7,
          },
          {
            title: t(translations.customerAccountManagement.income),
            component: (
              <Income
                setImages={setImages}
                images={images}
                customerKprInformation={customerKprInformation}
              />
            ),
            key: 8,
          },
          {
            title: t(translations.customerAccountManagement.bankRelation),
            component: (
              <BankRelation customerKprInformation={customerKprInformation} />
            ),
            key: 9,
          },
          {
            title: t(translations.customerAccountManagement.postScript),
            component: (
              <Postscript
                setImages={setImages}
                images={images}
                customerKprInformation={customerKprInformation}
              />
            ),
            key: 10,
          },
        ],
      },
      {
        key: 11,
        title: t(translations.customerAccountManagement.scoring),
        component: <Scoring />,
      },
      {
        key: 12,
        title: t(translations.customerAccountManagement.deposit),
        component: <Deposit />,
      },
      {
        key: 13,
        title: t(translations.customerAccountManagement.historyLog),
        component: <HistoryLog />,
      },
    ],
    [
      customerInformation,
      customerKycInformation,
      customerKprInformation,
      images,
    ],
  );

  return (
    <Box
      sx={{
        margin: '0px 24px 24px 24px',
      }}
    >
      <CustomTabs
        sidebar={sidebar}
        step={stepCustomer}
        setStep={setStepCustomer}
      />
    </Box>
  );
});

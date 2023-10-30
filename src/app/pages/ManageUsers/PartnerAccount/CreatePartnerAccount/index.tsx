import React from 'react';
import { Grid, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
import path from 'app/routes/path';
import BreadCrumbs from 'app/components/BreadCrumbs';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import styled from 'styled-components';
import { FormProvider, useForm } from 'react-hook-form';
import CustomButton from 'app/components/CustomButton';
import { LoadingButton } from '@mui/lab';
import SidebarInformation from 'app/components/SidebarInformation';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import { CreateBankAccountManagement, Images } from './slice/types';
import { useCreateHqBankPartnerSlice } from './slice';

import AccountInformation from './components/AccountInformation';
import CompanyInformation from './components/CompanyInformation';
import { PHONE_NUMBER, PHONE_REGEX } from 'utils/helpers/regex';
import { selectCreatePartner } from './slice/selectors';

const RootContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: whitesmoke;
`;

const Header = styled.div`
  font-size: 14px;
  line-height: 21px;
  // margin-bottom: 16px;
  padding: 16px 31px 0px 31px;
  .parent-label {
    color: #005fc5;
  }
`;

const CreatePartnerAccount = () => {
  const { t } = useTranslation();
  const [stepCreatePartner, setStepCreatePartner] = React.useState<number>(0);
  const [checked, setChecked] = React.useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector(selectCreatePartner);
  const { actions } = useCreateHqBankPartnerSlice();
  const [valueTab, setValueTab] = React.useState<number>(0);
  const links = React.useMemo(
    () => [
      {
        title: `${t(translations.common.manageUsers)}`,
        path: path.inventoryManagement,
      },
      {
        title: `${t(translations.partnerManagement.partnerAccount)}`,
        path: path.partnerAccountList,
      },
      { title: `${t(translations.partnerManagement.newPartnerAccount)}` },
    ],
    [t],
  );
  const [images, setImages] = React.useState<Images>({
    fileKtp: {
      file: null,
      url: '',
      name: '',
      nameFile: '',
    },
    fileDeedOfCompany: {
      file: null,
      url: '',
      name: '',
      nameFile: '',
    },
    fileNPWP: {
      file: null,
      url: '',
      name: '',
      nameFile: '',
    },
    fileNIP: {
      file: null,
      url: '',
      name: '',
      nameFile: '',
    },
    fileSK: {
      file: null,
      url: '',
      name: '',
      nameFile: '',
    },
  });
  const handleChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  const [disableCompanyInformation, setDisableCompanyInformation] =
    React.useState<boolean>(true);
  const [disableDocumentQualification, setDisableDocumentQualification] =
    React.useState<boolean>(true);
  const sidebar = [
    {
      title: t(translations.bankManagement.accountInformation),
      isDisable: false,
      component: <AccountInformation images={images} setImages={setImages} />,
    },
    {
      title: t(translations.bankManagement.companyInformation),
      isDisable: disableCompanyInformation,
      component: <CompanyInformation images={images} setImages={setImages} />,
    },
  ];

  let formRequestSchema = yup.object().shape({});
  switch (stepCreatePartner) {
    case 0:
      formRequestSchema = yup.object().shape({
        email: yup
          .string()
          .required(
            t(translations.createProductError.pleaseEnterRequiredFields),
          )
          .email(t(translations.required.invalidEmail))
          .nullable(),
        kyc: yup.object().shape({
          fullName: yup
            .string()
            .required(
              t(translations.createProductError.pleaseEnterRequiredFields),
            )
            .nullable(),
          phone: yup
            .string()
            .matches(PHONE_NUMBER, 'Invalid phone number')
            .required(
              t(translations.createProductError.pleaseEnterRequiredFields),
            )
            .nullable(),
          nik: yup
            .string()
            .required(
              t(translations.createProductError.pleaseEnterRequiredFields),
            )
            .nullable(),
          dob: yup
            .date()
            .max(
              new Date(),
              "Date of birth cannot be greater than today's date",
            )
            .typeError(t(translations.required.invalidDate))
            .required(
              t(translations.createProductError.pleaseEnterRequiredFields),
            )
            .nullable(),
        }),
        fileKtp: yup
          .string()
          .required(
            t(translations.createProductError.pleaseEnterRequiredFields),
          )
          .nullable(),
      });
      break;
    case 1:
      formRequestSchema = yup.object().shape({
        company: yup.object().shape({
          name: yup
            .string()
            .required(
              t(translations.createProductError.pleaseEnterRequiredFields),
            )
            .nullable(),
          address: yup
            .string()
            .required(
              t(translations.createProductError.pleaseEnterRequiredFields),
            )
            .nullable(),
          email: yup
            .string()
            .required(
              t(translations.createProductError.pleaseEnterRequiredFields),
            )
            .email(t(translations.required.invalidEmail))
            .nullable(),
          phone: yup
            .string()
            .matches(PHONE_NUMBER, t(translations.required.invalidPhoneNumber))
            .required(
              t(translations.createProductError.pleaseEnterRequiredFields),
            )
            .nullable(),
          sppkpNumber: yup
            .string()
            .required(
              t(translations.createProductError.pleaseEnterRequiredFields),
            )
            .nullable(),
          npwpNumber: yup
            .string()
            .required(
              t(translations.createProductError.pleaseEnterRequiredFields),
            )
            .nullable(),
        }),
        fileDeedOfCompany: yup
          .string()
          .required(
            t(translations.createProductError.pleaseEnterRequiredFields),
          )
          .nullable(),
        fileNPWP: yup
          .string()
          .required(
            t(translations.createProductError.pleaseEnterRequiredFields),
          )
          .nullable(),
        fileNIP: yup
          .string()
          .required(
            t(translations.createProductError.pleaseEnterRequiredFields),
          )
          .nullable(),
        fileSK: yup
          .string()
          .required(
            t(translations.createProductError.pleaseEnterRequiredFields),
          )
          .nullable(),
      });
      break;
  }

  const methods = useForm<CreateBankAccountManagement>({
    resolver: yupResolver(formRequestSchema),
  });
  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setValueTab(newValue);
    setStepCreatePartner(newValue);
  };

  const handleClickBack = () => {
    switch (valueTab) {
      case 0:
        navigate(path.partnerAccountList);
        break;
      case 1:
        setStepCreatePartner(0);
        setValueTab(0);
        break;
      case 2:
        setStepCreatePartner(0);
        setValueTab(1);
        break;
    }
  };

  const onSubmit = (data: CreateBankAccountManagement) => {
    if (stepCreatePartner === 0) {
      setDisableCompanyInformation(false);
      setValueTab(stepCreatePartner + 1);
      setStepCreatePartner(1);
      return;
    }
    const formData = { ...data };
    const newFileNames: string[] = [];
    if (images.fileKtp.nameFile) {
      newFileNames.push(images.fileKtp.nameFile);
    }
    if (images.fileDeedOfCompany.nameFile) {
      newFileNames.push(images.fileDeedOfCompany.nameFile);
    }
    if (images.fileNPWP.nameFile) {
      newFileNames.push(images.fileNPWP.nameFile);
    }
    if (images.fileNIP.nameFile) {
      newFileNames.push(images.fileNIP.nameFile);
    }
    if (images.fileSK.nameFile) {
      newFileNames.push(images.fileSK.nameFile);
    }
    formData.kyc.dob = formData.kyc.dob
      ? moment(formData.kyc.dob).format('yyyy-MM-DD')
      : '';
    dispatch(
      actions.createPartnerAccount({
        formRequest: {
          ...formData,
        },
        files: {
          fileName: newFileNames,
        },
        images,
        navigate,
      }),
    );
  };

  return (
    <RootContainer>
      <Header>
        <BreadCrumbs links={links} />
      </Header>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <FormProvider {...methods}>
          <Box sx={{ padding: '16px 31px 0px 31px' }}>
            <SidebarInformation
              sidebar={sidebar}
              handleChangeTab={handleChangeTab}
              valueTab={valueTab}
            />
          </Box>
          <Grid
            container
            mt={5}
            justifyContent="flex-end"
            sx={{ background: '#FFFFFF', padding: '10px 31px' }}
          >
            <Grid item md={2} sx={{ mr: 2 }}>
              <CustomButton
                content={t(translations.common.back)}
                fullWidth={true}
                isBorder
                isDisable={false}
                variant={'#FFFFFF'}
                handleClick={handleClickBack}
              />
            </Grid>
            <Grid item md={2}>
              <LoadingButton
                fullWidth={true}
                disabled={stepCreatePartner === 2 && !checked}
                sx={{
                  color: '#223250',
                  boxShadow: 'none',
                  fontSize: '16px',
                  padding: '12px 30px',
                  backgroundColor: `rgba(255, 204, 4, 1) !important`,
                  fontWeight: '600',
                }}
                variant="contained"
                type="submit"
                loading={isLoading}
              >
                {stepCreatePartner === 1
                  ? t(translations.common.create)
                  : t(translations.common.next)}
              </LoadingButton>
            </Grid>
          </Grid>
        </FormProvider>
      </form>
    </RootContainer>
  );
};

export default CreatePartnerAccount;

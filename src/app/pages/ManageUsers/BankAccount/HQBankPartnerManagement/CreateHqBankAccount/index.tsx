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
import DocumentQualification from './components/DocumentQualification';
import { PHONE_NUMBER, PHONE_REGEX } from 'utils/helpers/regex';
import { selectHqBankParnerManagementCreate } from './slice/selectors';

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

const CreateHqBankAccount = () => {
  const { t } = useTranslation();
  const [stepCreateBank, setStepCreateBank] = React.useState<number>(0);
  const [checked, setChecked] = React.useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector(selectHqBankParnerManagementCreate);
  const { actions } = useCreateHqBankPartnerSlice();
  const [valueTab, setValueTab] = React.useState<number>(0);
  const links = React.useMemo(
    () => [
      {
        title: `${t(translations.common.manageUsers)}`,
        path: path.inventoryManagement,
      },
      {
        title: `${t(translations.bankManagement.bankAccount)}`,
        path: path.productList,
      },
      { title: `${t(translations.bankManagement.registerNewBank)}` },
    ],
    [],
  );
  const [images, setImages] = React.useState<Images>({
    fileNik: {
      file: null,
      url: '',
      name: '',
      nameFile: '',
    },
    fileLogo: {
      file: null,
      url: '',
      name: '',
      nameFile: '',
    },
    filePhoto: {
      file: null,
      url: '',
      name: '',
      nameFile: '',
    },
    fileKtpDirector: {
      file: null,
      url: '',
      name: '',
      nameFile: '',
    },
    fileNpwp: {
      file: null,
      url: '',
      name: '',
      nameFile: '',
    },
    fileTdp: {
      file: null,
      url: '',
      name: '',
      nameFile: '',
    },
    fileSiup: {
      file: null,
      url: '',
      name: '',
      nameFile: '',
    },
    fileSppkp: {
      file: null,
      url: '',
      name: '',
      nameFile: '',
    },
    fileSignature: {
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
      component: <CompanyInformation />,
    },
    {
      title: t(translations.bankManagement.documentQualification),
      isDisable: disableDocumentQualification,
      component: (
        <DocumentQualification
          images={images}
          setImages={setImages}
          handleChangeCheckbox={handleChangeCheckbox}
          checked={checked}
        />
      ),
    },
  ];

  let formRequestSchema = yup.object().shape({});
  switch (stepCreateBank) {
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
        fileNik: yup
          .string()
          .required(
            t(translations.createProductError.pleaseEnterRequiredFields),
          )
          .nullable(),
        fileLogo: yup
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
      });
      break;
    case 2:
      formRequestSchema = yup.object().shape({
        fileKtpDirector: yup
          .string()
          .required(
            t(translations.createProductError.pleaseEnterRequiredFields),
          )
          .nullable(),
        fileNpwp: yup
          .string()
          .required(
            t(translations.createProductError.pleaseEnterRequiredFields),
          )
          .nullable(),
        fileTdp: yup
          .string()
          .required(
            t(translations.createProductError.pleaseEnterRequiredFields),
          )
          .nullable(),
        fileSiup: yup
          .string()
          .required(
            t(translations.createProductError.pleaseEnterRequiredFields),
          )
          .nullable(),
        fileSppkp: yup
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
    setStepCreateBank(newValue);
  };

  const handleClickBack = () => {
    switch (valueTab) {
      case 0:
        navigate(`/manage-users/bank`);
        break;
      case 1:
        setStepCreateBank(0);
        setValueTab(0);
        break;
      case 2:
        setStepCreateBank(0);
        setValueTab(1);
        break;
    }
  };

  const onSubmit = (data: CreateBankAccountManagement) => {
    if (stepCreateBank === 0) {
      setDisableCompanyInformation(false);
      setValueTab(stepCreateBank + 1);
      setStepCreateBank(1);
      return;
    }
    if (stepCreateBank === 1) {
      setDisableDocumentQualification(false);
      setValueTab(stepCreateBank + 1);
      setStepCreateBank(2);
      return;
    }
    const formData = { ...data };
    formData.kyc.dob = formData.kyc.dob
      ? moment(formData.kyc.dob).format('yyyy-MM-DD')
      : '';
    const newFileNames: string[] = [];
    if (images.fileNik.nameFile) {
      newFileNames.push(images.fileNik.nameFile);
    }
    if (images.fileLogo.nameFile) {
      newFileNames.push(images.fileLogo.nameFile);
    }
    if (images.filePhoto.nameFile) {
      newFileNames.push(images.filePhoto.nameFile);
    }
    if (images.fileKtpDirector.nameFile) {
      newFileNames.push(images.fileKtpDirector.nameFile);
    }
    if (images.fileNpwp.nameFile) {
      newFileNames.push(images.fileNpwp.nameFile);
    }
    if (images.fileTdp.nameFile) {
      newFileNames.push(images.fileTdp.nameFile);
    }
    if (images.fileSiup.nameFile) {
      newFileNames.push(images.fileSiup.nameFile);
    }
    if (images.fileSppkp.nameFile) {
      newFileNames.push(images.fileSppkp.nameFile);
    }
    formData.kyc.dob = formData.kyc.dob
      ? moment(formData.kyc.dob).format('yyyy-MM-DD')
      : '';

    dispatch(
      actions.createBankAccount({
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
                disabled={stepCreateBank === 2 && !checked}
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
                {stepCreateBank === 2 ? 'Create' : t(translations.common.next)}
              </LoadingButton>
            </Grid>
          </Grid>
        </FormProvider>
      </form>
    </RootContainer>
  );
};

export default CreateHqBankAccount;

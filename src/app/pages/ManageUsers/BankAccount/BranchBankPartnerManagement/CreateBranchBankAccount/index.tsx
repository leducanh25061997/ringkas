import React from 'react';
import { Grid, Box } from '@mui/material';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
import path from 'app/routes/path';
import BreadCrumbs from 'app/components/BreadCrumbs';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import CustomButton from 'app/components/CustomButton';
import { LoadingButton } from '@mui/lab';
import SidebarInformation from 'app/components/SidebarInformation';
import moment from 'moment';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import { CreateBranchBankAccountManagement, Images } from './slice/types';
import AccountInformation from './components/AccountInformation';
import BranchInformation from './components/BranchInformation';
import KycInformation from './components/KycInformation';

import { useCreateBranchBankPartnerSlice } from './slice';
import { selectBranchBankParnerManagementCreate } from './slice/selectors';
import { PHONE_NUMBER, PHONE_REGEX } from 'utils/helpers/regex';

const RootContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: whitesmoke;
  min-height: 300px;
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

const CreateBranchBankAccount = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { actions } = useCreateBranchBankPartnerSlice();
  const [stepCreateBank, setStepCreateBank] = React.useState<number>(0);
  const [checked, setChecked] = React.useState<boolean>(false);
  const [valueTab, setValueTab] = React.useState<number>(0);
  const fetchFormData = useSelector(selectBranchBankParnerManagementCreate);
  const [disableBranchInformation, setDisableBranchInformation] =
    React.useState<boolean>(true);
  const [disableKycInformation, setDisableKycInformation] =
    React.useState<boolean>(true);
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
    [t],
  );
  const [images, setImages] = React.useState<Images>({
    filePhoto: {
      file: null,
      url: '',
      name: '',
      nameFile: '',
    },
    fileNik: {
      file: null,
      url: '',
      name: '',
      nameFile: '',
    },
  });
  const handleChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  const sidebar = [
    {
      title: t(translations.bankManagement.accountInformation),
      isDisable: false,
      component: <AccountInformation images={images} setImages={setImages} />,
    },
    {
      title: t(translations.bankManagement.branchInformation),
      isDisable: disableBranchInformation,
      component: <BranchInformation />,
    },
    {
      title: 'KYC',
      isDisable: disableKycInformation,
      component: (
        <KycInformation
          images={images}
          setImages={setImages}
          handleChangeCheckbox={handleChangeCheckbox}
          checked={checked}
        />
      ),
    },
  ];

  React.useEffect(() => {
    dispatch(actions.fetchProvinces());
    dispatch(actions.fetchHeadQuarters());
  }, []);

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
        filePhoto: yup
          .string()
          .required(
            t(translations.createProductError.pleaseEnterRequiredFields),
          )
          .nullable(),
      });
      break;
    case 1:
      formRequestSchema = yup.object().shape({
        province: yup
          .object()
          .required(
            t(translations.createProductError.pleaseEnterRequiredFields),
          )
          .nullable(),
        city: yup
          .object()
          .required(
            t(translations.createProductError.pleaseEnterRequiredFields),
          )
          .nullable(),
        bankHqUuid: yup
          .object()
          .required(
            t(translations.createProductError.pleaseEnterRequiredFields),
          )
          .nullable(),
        company: yup.object().shape({
          name: yup
            .string()
            .required(
              t(translations.createProductError.pleaseEnterRequiredFields),
            )
            .nullable(),
          branchName: yup
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
        }),
      });
      break;
    case 2:
      formRequestSchema = yup.object().shape({
        company: yup.object().shape({
          titleBranch: yup
            .string()
            .required(
              t(translations.createProductError.pleaseEnterRequiredFields),
            )
            .nullable(),
          nip: yup
            .string()
            .required(
              t(translations.createProductError.pleaseEnterRequiredFields),
            )
            .nullable(),
        }),
        kyc: yup.object().shape({
          fullName: yup
            .string()
            .required(
              t(translations.createProductError.pleaseEnterRequiredFields),
            )
            .nullable(),
          phone: yup
            .string()
            .required(
              t(translations.createProductError.pleaseEnterRequiredFields),
            )
            .matches(PHONE_NUMBER, t(translations.required.invalidPhoneNumber))
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
      });
      break;
  }

  const methods = useForm<CreateBranchBankAccountManagement>({
    defaultValues: {},
    resolver: yupResolver(formRequestSchema),
  });
  const onSubmit = (data: CreateBranchBankAccountManagement) => {
    if (stepCreateBank === 0) {
      setDisableBranchInformation(false);
      setValueTab(stepCreateBank + 1);
      setStepCreateBank(1);
      return;
    }
    if (stepCreateBank === 1) {
      setDisableKycInformation(false);
      setValueTab(stepCreateBank + 1);
      setStepCreateBank(2);
      return;
    }
    const formData = { ...data };
    formData.kyc.dob = formData.kyc.dob
      ? moment(formData.kyc.dob).format('yyyy-MM-DD')
      : '';

    formData.company.parentAccountUserUuid =
      fetchFormData?.headquarters?.find(
        value => value.userUuid === formData.bankHqUuid?.value,
      )?.userUuid || '';
    const newFileNames: string[] = [];
    if (images.filePhoto.nameFile) {
      newFileNames.push(images.filePhoto.nameFile);
    }
    if (images.fileNik.nameFile) {
      newFileNames.push(images.fileNik.nameFile);
    }
    formData.company.province = formData.province?.value;
    formData.company.city = formData.city?.value;
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

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    // if (
    //   methods.formState.errors &&
    //   Object.keys(methods.formState.errors).length > 0
    // ) {
    //   return;
    // }
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
                disabled={stepCreateBank === 2 ? !checked : false}
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
                loading={fetchFormData.isLoading}
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

export default CreateBranchBankAccount;

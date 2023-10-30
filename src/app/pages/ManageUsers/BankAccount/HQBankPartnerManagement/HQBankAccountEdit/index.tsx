import React from 'react';
import path from 'app/routes/path';
import { Box, Grid } from '@mui/material';
import BreadCrumbs from 'app/components/BreadCrumbs';
import CustomButton from 'app/components/CustomButton';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { translations } from 'locales/translations';
import { useNavigate, useParams } from 'react-router';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { LoadingButton } from '@mui/lab';
import styled from 'styled-components';
import CustomTabs from 'app/components/CustomTabs';
import { numberRegex } from 'utils/helpers/regex';

import AccountInformation from './components/AccountInformation';
import KYC from './components/KycInformation';
import CompanyInformation from './components/CompanyInfomation';
import DocumentQualification from './components/DocumentQualification';
import { selectBankAccountInfo } from './slice/selectors';
import { useBankAccountInfoSlice } from './slice';
import { HistoryLog } from './components/HistoryLog';
import { BankAccountForm, BankAccountType } from 'types/BankAccountManagement';
import { ImagesOfHQBank } from './slice/types';
import moment from 'moment';

const RootContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: whitesmoke;
`;

const Header = styled.div`
  font-size: 14px;
  line-height: 21px;
  // margin-bottom: 16px;
  padding: 16px 32px 0px 32px;
  .parent-label {
    color: #005fc5;
  }
`;

const HQBankAccountEdit = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { t } = useTranslation();
  const { id } = params;
  const { hqBankAccountInfo, isLoading } = useSelector(selectBankAccountInfo);
  const navigate = useNavigate();
  const [step, setStep] = React.useState<number>(0);
  const [images, setImages] = React.useState<ImagesOfHQBank>({
    fileNik: {
      file: '',
      url: '',
      name: '',
      nameFile: '',
      s3Key: '',
      originalName: '',
    },
    fileKtpDirector: {
      file: '',
      url: '',
      name: '',
      nameFile: '',
      s3Key: '',
      originalName: '',
    },
    fileNpwp: {
      file: '',
      url: '',
      name: '',
      nameFile: '',
      s3Key: '',
      originalName: '',
    },
    fileTdp: {
      file: '',
      url: '',
      name: '',
      nameFile: '',
      s3Key: '',
      originalName: '',
    },
    fileSiup: {
      file: '',
      url: '',
      name: '',
      nameFile: '',
      s3Key: '',
      originalName: '',
    },
    fileSppkp: {
      file: '',
      url: '',
      name: '',
      nameFile: '',
      s3Key: '',
      originalName: '',
    },
    fileNda: {
      file: '',
      url: '',
      name: '',
      nameFile: '',
      s3Key: '',
      originalName: '',
    },
    fileMou: {
      file: '',
      url: '',
      name: '',
      nameFile: '',
      s3Key: '',
      originalName: '',
    },
  });
  const { actions } = useBankAccountInfoSlice();
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
        component: <KYC images={images} setImages={setImages} />,
      },
      {
        key: 2,
        title: t(translations.developerInformation.companyInformation),
        component: <CompanyInformation />,
      },
      {
        key: 3,
        title: t(translations.developerInformation.documentQualification),
        component: (
          <DocumentQualification images={images} setImages={setImages} />
        ),
      },
      {
        key: 4,
        title: t(translations.developerInformation.historyLog),
        component: <HistoryLog />,
      },
    ],
    [hqBankAccountInfo, images],
  );
  const links = React.useMemo(
    () => [
      { title: t(translations.common.manageUsers), path: path.manageUsers },
      { title: 'Update Developer Account', path: path.customerAccountList },
      { title: 'Update Customer Infomation' },
    ],
    [],
  );

  const validateForm = yup.object().shape({
    kyc: yup.object().shape({
      fullName: yup
        .string()
        .required(t(translations.createProductError.pleaseEnterRequiredFields))
        .nullable(),
      phone: yup
        .string()
        .matches(numberRegex, t(translations.required.numberError))
        .required(t(translations.createProductError.pleaseEnterRequiredFields))
        .nullable(),
      nik: yup
        .string()
        .matches(numberRegex, t(translations.required.numberError))
        .required(t(translations.createProductError.pleaseEnterRequiredFields))
        .nullable(),
      dob: yup
        .string()
        .required(t(translations.createProductError.pleaseEnterRequiredFields))
        .nullable(),
    }),
    fileNik: yup.lazy(value =>
      typeof value === 'string'
        ? yup
            .string()
            .required(
              t(translations.createProductError.pleaseEnterRequiredFields),
            )
            .nullable()
        : yup
            .array()
            .required(
              t(translations.createProductError.pleaseEnterRequiredFields),
            )
            .nullable(),
    ),
    company: yup.object().shape({
      name: yup
        .string()
        .required(t(translations.createProductError.pleaseEnterRequiredFields))
        .nullable(),
      address: yup
        .string()
        .required(t(translations.createProductError.pleaseEnterRequiredFields))
        .nullable(),
      email: yup
        .string()
        .required(t(translations.createProductError.pleaseEnterRequiredFields))
        .email(t(translations.required.invalidEmail))
        .nullable(),
      phone: yup
        .string()
        .matches(numberRegex, t(translations.required.numberError))
        .required(t(translations.createProductError.pleaseEnterRequiredFields))
        .nullable(),
      sppkpNumber: yup
        .string()
        .matches(numberRegex, t(translations.required.numberError))
        .required(t(translations.createProductError.pleaseEnterRequiredFields))
        .nullable(),
      npwpNumber: yup
        .string()
        .matches(numberRegex, t(translations.required.numberError))
        .required(t(translations.createProductError.pleaseEnterRequiredFields))
        .nullable(),
    }),
    fileKtpDirector: yup.lazy(value =>
      typeof value === 'string'
        ? yup
            .string()
            .required(
              t(translations.createProductError.pleaseEnterRequiredFields),
            )
            .nullable()
        : yup
            .array()
            .required(
              t(translations.createProductError.pleaseEnterRequiredFields),
            )
            .nullable(),
    ),
    fileNpwp: yup.lazy(value =>
      typeof value === 'string'
        ? yup
            .string()
            .required(
              t(translations.createProductError.pleaseEnterRequiredFields),
            )
            .nullable()
        : yup
            .array()
            .required(
              t(translations.createProductError.pleaseEnterRequiredFields),
            )
            .nullable(),
    ),
    fileSiup: yup.lazy(value =>
      typeof value === 'string'
        ? yup
            .string()
            .required(
              t(translations.createProductError.pleaseEnterRequiredFields),
            )
            .nullable()
        : yup
            .array()
            .required(
              t(translations.createProductError.pleaseEnterRequiredFields),
            )
            .nullable(),
    ),
    fileSppkp: yup.lazy(value =>
      typeof value === 'string'
        ? yup
            .string()
            .required(
              t(translations.createProductError.pleaseEnterRequiredFields),
            )
            .nullable()
        : yup
            .array()
            .required(
              t(translations.createProductError.pleaseEnterRequiredFields),
            )
            .nullable(),
    ),
    fileTdp: yup.lazy(value =>
      typeof value === 'string'
        ? yup
            .string()
            .required(
              t(translations.createProductError.pleaseEnterRequiredFields),
            )
            .nullable()
        : yup
            .array()
            .required(
              t(translations.createProductError.pleaseEnterRequiredFields),
            )
            .nullable(),
    ),
  });

  const methods = useForm<BankAccountForm>({
    resolver: yupResolver(validateForm),
  });

  React.useEffect(() => {
    if (!id) return;
    dispatch(actions.fetchBankAccountInfo(id));
  }, []);

  React.useEffect(() => {
    if (hqBankAccountInfo && Object.keys(hqBankAccountInfo).length > 0) {
      const files = hqBankAccountInfo.documentQualification;
      if (hqBankAccountInfo?.kyc?.fileNik || files?.fileKtpDirector) {
        setImages({
          fileNik: {
            file: '',
            url: hqBankAccountInfo?.kyc?.fileNik?.url || '',
            name: 'fileNik',
            nameFile: '',
            s3Key: hqBankAccountInfo?.kyc?.fileNik?.s3Key || '',
            originalName: hqBankAccountInfo?.kyc?.fileNik?.originalName || '',
          },
          fileKtpDirector: {
            file: '',
            url:
              files.fileKtpDirector && files.fileKtpDirector[0]
                ? files.fileKtpDirector[0].url
                : '',
            name: 'fileKtpDirector',
            nameFile: '',
            s3Key:
              files.fileKtpDirector && files.fileKtpDirector[0]
                ? files.fileKtpDirector[0].s3Key
                : '',
            originalName:
              files.fileKtpDirector && files.fileKtpDirector[0]
                ? files.fileKtpDirector[0].originalName
                : '',
          },
          fileNpwp: {
            file: '',
            url:
              files.fileNpwp && files.fileNpwp[0] ? files.fileNpwp[0].url : '',
            name: 'fileNpwp',
            nameFile: '',
            s3Key:
              files.fileNpwp && files.fileNpwp[0]
                ? files.fileNpwp[0].s3Key
                : '',
            originalName:
              files.fileNpwp && files.fileNpwp[0]
                ? files.fileNpwp[0].originalName
                : '',
          },
          fileTdp: {
            file: '',
            url: files.fileTdp && files.fileTdp[0] ? files.fileTdp[0].url : '',
            name: 'fileTdp',
            nameFile: '',
            s3Key:
              files.fileTdp && files.fileTdp[0] ? files.fileTdp[0].s3Key : '',
            originalName:
              files.fileTdp && files.fileTdp[0]
                ? files.fileTdp[0].originalName
                : '',
          },
          fileSiup: {
            file: '',
            url:
              files.fileSiup && files.fileSiup[0] ? files.fileSiup[0].url : '',
            name: 'fileSiup',
            nameFile: '',
            s3Key:
              files.fileSiup && files.fileSiup[0]
                ? files.fileSiup[0].s3Key
                : '',
            originalName:
              files.fileSiup && files.fileSiup[0]
                ? files.fileSiup[0].originalName
                : '',
          },
          fileSppkp: {
            file: '',
            url:
              files.fileSppkp && files.fileSppkp[0]
                ? files.fileSppkp[0].url
                : '',
            name: 'fileSppkp',
            nameFile: '',
            s3Key:
              files.fileSppkp && files.fileSppkp[0]
                ? files.fileSppkp[0].s3Key
                : '',
            originalName:
              files.fileSppkp && files.fileSppkp[0]
                ? files.fileSppkp[0].originalName
                : '',
          },
          fileNda: {
            file: '',
            url: files.fileNda && files.fileNda[0] ? files.fileNda[0].url : '',
            name: 'fileNda',
            nameFile: '',
            s3Key:
              files.fileNda && files.fileNda[0] ? files.fileNda[0].s3Key : '',
            originalName:
              files.fileNda && files.fileNda[0]
                ? files.fileNda[0].originalName
                : '',
          },
          fileMou: {
            file: '',
            url:
              files?.fileMou && files.fileMou[0] ? files?.fileMou[0].url : '',
            name: 'fileMou',
            nameFile: '',
            s3Key:
              files?.fileMou && files.fileMou[0] ? files?.fileMou[0].s3Key : '',
            originalName:
              files?.fileMou && files.fileMou[0]
                ? files?.fileMou[0].originalName
                : '',
          },
        });
        methods.setValue(
          'fileKtpDirector',
          hqBankAccountInfo?.documentQualification?.fileKtpDirector,
        );
        methods.setValue(
          'fileNpwp',
          hqBankAccountInfo?.documentQualification?.fileNpwp,
        );
        methods.setValue(
          'fileSiup',
          hqBankAccountInfo?.documentQualification?.fileSiup,
        );
        methods.setValue(
          'fileSppkp',
          hqBankAccountInfo?.documentQualification?.fileSppkp,
        );
        methods.setValue(
          'fileTdp',
          hqBankAccountInfo?.documentQualification.fileTdp,
        );
        methods.setValue(
          'fileMou',
          hqBankAccountInfo?.documentQualification?.fileMou,
        );
        methods.setValue(
          'fileNda',
          hqBankAccountInfo?.documentQualification?.fileNda,
        );
        methods.setValue(
          'documentQualification.mouExpiredDate',
          hqBankAccountInfo?.documentQualification?.mouExpiredDate,
        );
      }
      methods.setValue(
        'documentQualification.ndaExpiredDate',
        hqBankAccountInfo?.documentQualification?.ndaExpiredDate,
      );
      methods.setValue('kyc.dob', hqBankAccountInfo?.kyc?.dob);
      methods.setValue('bankAccountType', BankAccountType.HEAD_QUARTER);
      methods.setValue('email', hqBankAccountInfo?.email);
      methods.setValue('kyc.fullName', hqBankAccountInfo?.kyc?.fullName);
      methods.setValue('kyc.phone', hqBankAccountInfo?.kyc?.phone);
      methods.setValue('kyc.nik', hqBankAccountInfo?.kyc?.nik);
      methods.setValue('userUuid', hqBankAccountInfo?.userUuid);
      methods.setValue('company.name', hqBankAccountInfo?.company.name || '');
      methods.setValue('fileNik', hqBankAccountInfo?.kyc?.fileNik?.url);
      methods.setValue(
        'company.address',
        hqBankAccountInfo?.company.address || '',
      );
      methods.setValue('company.email', hqBankAccountInfo?.company.email || '');
      methods.setValue('company.phone', hqBankAccountInfo?.company.phone || '');
      methods.setValue(
        'company.npwpNumber',
        hqBankAccountInfo?.company.npwpNumber || '',
      );
      methods.setValue(
        'company.sppkpNumber',
        hqBankAccountInfo?.company.sppkpNumber || '',
      );
    }
  }, [hqBankAccountInfo]);

  const handleClick = () => {
    navigate(path.bankAccountList);
  };

  const onSubmit = (data: BankAccountForm) => {
    const formData = { ...data };
    formData.userUuid = id;
    const newFileNames: string[] = [];
    if (images?.fileNik?.nameFile) {
      newFileNames.push(images?.fileNik?.nameFile);
    }
    if (images?.fileKtpDirector?.nameFile) {
      newFileNames.push(images?.fileKtpDirector?.nameFile);
    }
    if (images?.fileNpwp?.nameFile) {
      newFileNames.push(images?.fileNpwp?.nameFile);
    }
    if (images?.fileSiup?.nameFile) {
      newFileNames.push(images?.fileSiup?.nameFile);
    }
    if (images?.fileSppkp?.nameFile) {
      newFileNames.push(images?.fileSppkp?.nameFile);
    }
    if (images?.fileTdp?.nameFile) {
      newFileNames.push(images?.fileTdp?.nameFile);
    }
    if (images?.fileMou?.nameFile) {
      newFileNames.push(images?.fileMou?.nameFile);
    }
    if (images?.fileNda?.nameFile) {
      newFileNames.push(images?.fileNda?.nameFile);
    }
    formData.kyc.dob = formData.kyc.dob
      ? moment(formData.kyc.dob).format('yyyy-MM-DD')
      : '';
    dispatch(
      actions.updateHQBankRequest({
        formData,
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
          <Box sx={{ padding: '16px 32px 0px 32px' }}>
            <CustomTabs sidebar={sidebar} step={step} setStep={setStep} />
          </Box>
          <Grid
            container
            mt={5}
            justifyContent="flex-end"
            sx={{ background: '#FFFFFF', padding: '10px 32px' }}
          >
            <Grid item md={2} sx={{ mr: 2 }}>
              <CustomButton
                content={'cancel'}
                fullWidth={true}
                isDisable={false}
                variant={'#FFFFFF'}
                handleClick={handleClick}
                isBorder
              />
            </Grid>
            <Grid item md={2}>
              <LoadingButton
                fullWidth={true}
                sx={{
                  color: '#223250',
                  boxShadow: 'none',
                  padding: '14px 30px',
                  backgroundColor: `rgba(255, 204, 4, 1) !important`,
                }}
                variant="contained"
                loading={isLoading}
                type="submit"
              >
                {t(translations.common.update)}
              </LoadingButton>
            </Grid>
          </Grid>
        </FormProvider>
      </form>
    </RootContainer>
  );
};

export default HQBankAccountEdit;

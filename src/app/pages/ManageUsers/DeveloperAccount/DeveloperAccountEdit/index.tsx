import React from 'react';
import path from 'app/routes/path';
import { Box, Dialog, Grid } from '@mui/material';
import BreadCrumbs from 'app/components/BreadCrumbs';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { translations } from 'locales/translations';
import { useNavigate, useParams } from 'react-router';
import moment from 'moment';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import CustomerAcount from './Component/CustomerAcount';
import KycInfomation from './Component/KycInfomation';
import CompanyInfomation from './Component/CompanyInfomation';
import DocumentQualification from './Component/DocumentQualification';
import { numberRegex } from 'utils/helpers/regex';
import CustomTabs from 'app/components/CustomTabs';

import { selectDeveloperAccountEdit } from './slice/selectors';
import { useDeveloperAccountEditSlice } from './slice';
import { DeveloperAccountInfor } from './slice/types';
import Spinner from '../../../../../assets/loader/spinner.svg';

const RootContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: whitesmoke;
  justify-content: space-between;
  min-height: calc(100vh - 85px) !important;
  height: 100%;
`;

const Header = styled.div`
  font-size: 14px;
  line-height: 21px;
  padding-top: 20px;

  .parent-label {
    color: #005fc5;
  }
`;

const ActionButtonWrap = styled.div`
  display: flex;
  justify-content: flex-end;

  background: #fff;
  padding: 12px 32px;
`;

const ConfirmButton = styled.button`
  padding: 10px 20px;
  line-height: 28px;
  font-weight: 600;
  background: ${props => (props.disabled ? '#f3f3f3' : 'rgba(255, 204, 4, 1)')};
  border-radius: 8px;
  color: #000;
  width: 128px;
`;

const CancelButton = styled.div`
  width: 128px;
  padding: 10px 22px;
  line-height: 28px;
  font-weight: 600;
  border-radius: 8px;
  color: #000;
  border: 1px solid #000;
  background: #ffffff;
  margin-right: 32px;
  text-align: center;
  cursor: pointer;
`;

const DeveloperAccountEdit = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { t } = useTranslation();
  const { id } = params;
  const { developerAccountInfo, isLoading } = useSelector(
    selectDeveloperAccountEdit,
  );
  const navigate = useNavigate();
  const [images, setImages] = React.useState<any>({
    fileKtp: {
      file: null,
      url: '',
      name: '',
      nameFile: '',
      s3Key: '',
      originalName: '',
    },
    fileKtpDirector: {
      file: null,
      url: '',
      name: '',
      nameFile: '',
      s3Key: '',
      originalName: '',
    },
    fileNpwp: {
      file: null,
      url: '',
      name: '',
      nameFile: '',
      s3Key: '',
      originalName: '',
    },
    fileTdp: {
      file: null,
      url: '',
      name: '',
      nameFile: '',
      s3Key: '',
      originalName: '',
    },
    fileSiup: {
      file: null,
      url: '',
      name: '',
      nameFile: '',
      s3Key: '',
      originalName: '',
    },
    fileSppkp: {
      file: null,
      url: '',
      name: '',
      nameFile: '',
      s3Key: '',
      originalName: '',
    },
  });
  const [isErrorKyc, setIsErrorKyc] = React.useState<boolean>(false);
  const [isErrorCompany, setIsErrorCompany] = React.useState<boolean>(false);
  const [isErrorDocument, setIsErrorDocument] = React.useState<boolean>(false);
  const [step, setStep] = React.useState<number>(0);
  const { actions } = useDeveloperAccountEditSlice();
  const sidebar = [
    {
      title: 'Account Information',
      isShowError: false,
      key: 0,
      component: <CustomerAcount developerAccountInfo={developerAccountInfo} />,
    },
    {
      title: 'KYC',
      isShowError: isErrorKyc,
      key: 1,
      component: (
        <KycInfomation
          developerAccountInfo={developerAccountInfo}
          images={images}
          setImages={setImages}
        />
      ),
    },
    {
      title: 'Company Information',
      isShowError: isErrorCompany,
      key: 2,
      component: (
        <CompanyInfomation developerAccountInfo={developerAccountInfo} />
      ),
    },
    {
      title: 'Document Qualification',
      isShowError: isErrorDocument,
      key: 3,
      component: (
        <DocumentQualification images={images} setImages={setImages} />
      ),
    },
    {
      title: 'History Log',
      key: 4,
      component: <div style={{ minHeight: '600px' }}>{'History Log'}</div>,
    },
  ];
  const links = React.useMemo(
    () => [
      { title: t(translations.common.manageUsers), path: path.manageUsers },
      { title: 'Update Developer Account', path: path.customerAccountList },
      { title: 'Update Customer Infomation' },
    ],
    [t],
  );

  React.useEffect(() => {
    if (!id) return;
    dispatch(actions.fetchDeveloperAccountInfo(id));
  }, []);

  React.useEffect(() => {
    if (developerAccountInfo && Object.keys(developerAccountInfo).length > 0) {
      const files = developerAccountInfo?.documentQualification;
      if (
        files &&
        files?.fileKtpDirector &&
        developerAccountInfo?.kyc?.fileKtp
      ) {
        setImages({
          fileSignature: {
            file: null,
            url: developerAccountInfo?.kyc?.fileSignature[0]?.url || '',
            name: 'fileKtp',
            nameFile: '',
            s3Key: developerAccountInfo?.kyc?.fileSignature[0]?.s3Key,
            originalName:
              developerAccountInfo?.kyc.fileSignature[0]?.originalName,
          },
          fileKtp: {
            file: null,
            url: developerAccountInfo?.kyc?.fileKtp[0]?.url || '',
            name: 'fileKtp',
            nameFile: '',
            s3Key: developerAccountInfo?.kyc?.fileKtp[0]?.s3Key,
            originalName: developerAccountInfo?.kyc.fileKtp[0]?.originalName,
          },
          fileKtpDirector: {
            file: null,
            url: files?.fileKtpDirector[0]?.url,
            name: 'fileKtpDirector',
            nameFile: '',
            s3Key: files?.fileKtpDirector[0]?.s3Key,
            originalName: files?.fileKtpDirector[0]?.originalName,
          },
          fileNpwp: {
            file: null,
            url: files?.fileNpwp[0]?.url,
            name: 'fileNpwp',
            nameFile: '',
            s3Key: files?.fileNpwp[0]?.s3Key,
            originalName: files?.fileNpwp[0]?.originalName,
          },
          fileTdp: {
            file: null,
            url: files?.fileTdp[0]?.url,
            name: 'fileTdp',
            nameFile: '',
            s3Key: files?.fileTdp[0]?.s3Key,
            originalName: files?.fileTdp[0]?.originalName,
          },
          fileSiup: {
            file: null,
            url: files?.fileSiup[0]?.url,
            name: 'fileSiup',
            nameFile: '',
            s3Key: files?.fileSiup[0]?.s3Key,
            originalName: files?.fileSiup[0]?.originalName,
          },
          fileSppkp: {
            file: null,
            url: files?.fileSppkp[0]?.url,
            name: 'fileSppkp',
            nameFile: '',
            s3Key: files?.fileSppkp[0]?.s3Key,
            originalName: files?.fileSppkp[0]?.originalName,
          },
        });
        methods.setValue(
          'fileKtpDirector',
          developerAccountInfo?.documentQualification?.fileKtpDirector[0]
            ?.s3Key || '',
        );
        methods.setValue(
          'fileNpwp',
          developerAccountInfo?.documentQualification?.fileNpwp[0]?.s3Key || '',
        );
        methods.setValue(
          'fileSiup',
          developerAccountInfo?.documentQualification?.fileSiup[0]?.s3Key || '',
        );
        methods.setValue(
          'fileSppkp',
          developerAccountInfo?.documentQualification?.fileSppkp[0]?.s3Key ||
            '',
        );
        methods.setValue(
          'fileTdp',
          developerAccountInfo?.documentQualification?.fileTdp[0]?.s3Key || '',
        );
      }

      if (
        developerAccountInfo?.kyc?.fileKtp &&
        developerAccountInfo?.kyc?.fileKtp.length > 0 &&
        developerAccountInfo?.kyc?.fileKtp[0]?.s3Key
      ) {
        methods.setValue('fileKtp', developerAccountInfo.kyc.fileKtp[0].s3Key);
      }
      if (
        developerAccountInfo?.kyc?.fileSignature &&
        developerAccountInfo?.kyc?.fileSignature.length > 0 &&
        developerAccountInfo?.kyc?.fileSignature[0]?.s3Key
      ) {
        methods.setValue(
          'fileKtp',
          developerAccountInfo.kyc.fileSignature[0].s3Key,
        );
      }

      methods.setValue('kyc.dob', developerAccountInfo?.kyc?.dob);
      methods.setValue('kyc.fullName', developerAccountInfo?.kyc?.fullName);
      methods.setValue('email', developerAccountInfo?.email);
      methods.setValue('kyc.phone', developerAccountInfo?.kyc?.phone);
      methods.setValue('kyc.nik', developerAccountInfo?.kyc?.nik);
      methods.setValue('status', developerAccountInfo?.status);
      methods.setValue('userUuid', developerAccountInfo?.userUuid);
      methods.setValue(
        'company.name',
        developerAccountInfo?.company.name || '',
      );
      methods.setValue(
        'company.address',
        developerAccountInfo?.company.address || '',
      );
      methods.setValue(
        'company.email',
        developerAccountInfo?.company.email || '',
      );
      methods.setValue(
        'company.phone',
        developerAccountInfo?.company.phone || '',
      );
      methods.setValue(
        'company.npwpNumber',
        developerAccountInfo?.company.npwpNumber || '',
      );
      methods.setValue(
        'company.sppkpNumber',
        developerAccountInfo?.company.sppkpNumber || '',
      );
    }
  }, [developerAccountInfo]);

  const handleClick = () => {
    navigate(path.developerAccountList);
  };

  const formRequestSchema = yup.object().shape({
    email: yup
      .string()
      .required(t(translations.required.emailIsRequired))
      .email(t(translations.required.invalidEmail)),
    kyc: yup.object().shape({
      fullName: yup
        .string()
        .required(t(translations.required.fullNameIsRequired)),
      phone: yup.string().required(t(translations.required.phoneIsRequired)),
      nik: yup.string().required(t(translations.required.nikIsRequired)),
      dob: yup
        .date()
        .max(new Date(), "Date of birth cannot be greater than today's date")
        .typeError(t(translations.required.invalidDate))
        .required(t(translations.createProductError.pleaseEnterRequiredFields))
        .nullable(),
    }),
    company: yup.object().shape({
      name: yup
        .string()
        .required(t(translations.required.companyNameIsRequired)),
      email: yup
        .string()
        .email(t(translations.required.incorrectEmail))
        .required(t(translations.required.companyEmailIsRequired)),
      address: yup
        .string()
        .required(t(translations.required.companyAddressIsRequired)),
      phone: yup
        .string()
        .matches(numberRegex, t(translations.required.numberError))
        .required(t(translations.required.companyPhoneNumberIsRequired)),
      sppkpNumber: yup
        .string()
        .required(t(translations.required.companySppkpNumberIsRequired)),
      npwpNumber: yup
        .string()
        .matches(numberRegex, t(translations.required.numberError))
        .required(t(translations.required.companyNpwpNumberIsRequired)),
    }),
    fileKtp: yup.lazy(value =>
      typeof value === 'string'
        ? yup
            .string()
            .required(t(translations.required.fileKtpIsRequired))
            .nullable()
        : yup
            .array()
            .required(t(translations.required.fileKtpIsRequired))
            .nullable(),
    ),
    fileKtpDirector: yup.lazy(value =>
      typeof value === 'string'
        ? yup
            .string()
            .required(t(translations.required.fileKtpDirectorIsRequired))
            .nullable()
        : yup
            .array()
            .required(t(translations.required.fileKtpDirectorIsRequired))
            .nullable(),
    ),
    fileNpwp: yup.lazy(value =>
      typeof value === 'string'
        ? yup
            .string()
            .required(t(translations.required.fileNpwpIsRequired))
            .nullable()
        : yup
            .array()
            .required(t(translations.required.fileNpwpIsRequired))
            .nullable(),
    ),
    fileTdp: yup.lazy(value =>
      typeof value === 'string'
        ? yup
            .string()
            .required(t(translations.required.fileTdpIsRequired))
            .nullable()
        : yup
            .array()
            .required(t(translations.required.fileTdpIsRequired))
            .nullable(),
    ),
    fileSiup: yup.lazy(value =>
      typeof value === 'string'
        ? yup
            .string()
            .required(t(translations.required.fileSiupIsRequired))
            .nullable()
        : yup
            .array()
            .required(t(translations.required.fileSiupIsRequired))
            .nullable(),
    ),
    fileSppkp: yup.lazy(value =>
      typeof value === 'string'
        ? yup
            .string()
            .required(t(translations.required.fileSppkpIsRequired))
            .nullable()
        : yup
            .array()
            .required(t(translations.required.fileSppkpIsRequired))
            .nullable(),
    ),
  });

  const methods = useForm<DeveloperAccountInfor>({
    defaultValues: {},
    resolver: yupResolver(formRequestSchema),
  });

  const onSubmit = (data: DeveloperAccountInfor) => {
    const formData = { ...data };
    const _fileNames = Object.keys(images)
      .map(key => images[key]?.nameFile)
      .filter(item => item !== '');
    formData.kyc.dob = formData.kyc.dob
      ? moment(formData.kyc.dob).format('yyyy-MM-DD')
      : '';
    dispatch(
      actions.editDeveloperAccountInfo({
        formRequest: formData,
        files: {
          fileName: _fileNames,
        },
        images,
      }),
    );
  };

  return (
    <form onSubmit={methods.handleSubmit(onSubmit)}>
      <FormProvider {...methods}>
        <RootContainer>
          <div className="flex flex-col flex-1 h-full mx-5">
            <Header>
              <BreadCrumbs links={links} />
            </Header>
            <Box sx={{ flex: 1, background: '#fff' }}>
              <CustomTabs sidebar={sidebar} step={step} setStep={setStep} />
            </Box>
          </div>

          <div className="mx-5 mt-5">
            <Grid
              container
              justifyContent="flex-end"
              sx={{ background: '#FFFFFF' }}
            >
              <ActionButtonWrap>
                <CancelButton onClick={handleClick}>Back</CancelButton>
                <ConfirmButton type="submit">Update</ConfirmButton>
              </ActionButtonWrap>
            </Grid>
          </div>
        </RootContainer>
      </FormProvider>
      <Dialog
        open={isLoading!}
        PaperProps={{
          style: {
            backgroundColor: 'transparent',
            color: 'black',
            boxShadow: 'none',
          },
        }}
      >
        <img
          src={Spinner}
          alt={''}
          style={{ width: '100px', height: '100px' }}
        />
      </Dialog>
    </form>
  );
};

export default DeveloperAccountEdit;

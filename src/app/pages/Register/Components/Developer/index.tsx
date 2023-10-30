import {
  Box,
  Grid,
  Link,
  Stack,
  Step,
  StepLabel,
  Stepper,
  styled,
  Typography,
} from '@mui/material';
import Button, { ButtonProps } from '@mui/material/Button';
import moment from 'moment';
import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { RegistrationRequest } from 'types';

import iconDeveloper from '../../../../../assets/images/icon_developer_kpr.svg';

import { useSignUpCreateSlice } from '../../slice';

import { useAuthSlice } from 'app/pages/Login/slice';
import Notifier from 'app/pages/Notifier';
import path from 'app/routes/path';
import classNames from 'classnames';
import Otp from '../Otp';
import CompanyInfomation from './CompanyInfomation';
import DocumentQualification from './DocumentQualification';
import PicData from './PicData';

interface Props {}

interface DataRegister {
  fullName?: string;
  email?: string;
  password?: string;
  phone?: string;
}

const CustomTab = styled('div')(({ theme }) => ({
  '& .tab_list': {
    '& .MuiButtonBase-root.Mui-selected': {
      color: '#FFCC04 !important',
      borderBottom: '2px solid #C6D7E0',
    },
    '& .MuiButtonBase-root': {
      color: '#C6D7E0 !important',
      borderBottom: '2px solid #C6D7E0',
    },
  },
  '& .MuiTabs-indicator': {
    background: '#005FC5',
  },
}));

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  backgroundColor: 'rgba(255, 204, 4, 1) !important',
  color: '#223250',
  boxShadow: 'none',
  '&:hover': {
    backgroundColor: 'rgba(255, 204, 4, 1)',
    boxShadow: 'none',
  },
}));

const RootStyle = styled('div')(({ theme }) => ({
  '& .MuiStepConnector-root': {
    display: 'none',
  },
}));

const TextActive = styled('div')(({ theme }) => ({
  '& .MuiStepLabel-iconContainer': {
    display: 'none',
  },
  '& .Mui-completed': {
    color: '#FFFFFF !important',
  },
  '& .Mui-active': {
    color: '#FFFFFF !important',
  },
}));

const steps = [
  '1. PIC Data',
  '2. Company Information',
  '3. Document Qualification',
];

const DeveloperPage = (props: Props) => {
  const [skipped, setSkipped] = React.useState(new Set<number>());
  const navigate = useNavigate();
  const [dataLocalStorage, setDataLocalStorage] =
    React.useState<RegistrationRequest>();
  const [page, setPage] = React.useState<'OTP' | 'SIGN_UP'>('SIGN_UP');
  const dispatch = useDispatch();
  const { actions: loginActions } = useAuthSlice();
  const { actions } = useSignUpCreateSlice();
  const [activeStep, setActiveStep] = React.useState<any>(0);
  const [currentActiveStep, setCurrentActiveStep] = React.useState<any>(0);
  const [images, setImages] = React.useState<any>({
    photoKtp: {
      type: 'PHOTO',
      file: null,
      url: '',
      name: '',
      nameFile: '',
    },
    documentKtp: {
      type: 'KTP',
      file: null,
      url: '',
      name: '',
      nameFile: '',
      isDisable: true,
    },
    documentNpWp: {
      type: 'NPWP',
      file: null,
      url: '',
      name: '',
      nameFile: '',
      isDisable: true,
    },
    documentTdp: {
      type: 'TDP',
      file: null,
      url: '',
      name: '',
      nameFile: '',
      isDisable: true,
    },
    documentSiup: {
      type: 'SIUP',
      file: null,
      url: '',
      name: '',
      nameFile: '',
      isDisable: true,
    },
    documentSppkp: {
      type: 'SPPKP',
      file: null,
      url: '',
      name: '',
      nameFile: '',
      isDisable: true,
    },
  });

  useEffect(() => {
    if (page === 'OTP')
      dispatch(
        loginActions.login({
          username: methods.getValues().email || formData.email,
          password: methods.getValues().password || formData.password,
        }),
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const methods = useForm<RegistrationRequest>({
    defaultValues: {},
    // resolver: yupResolver(formRequestSchema),
  });

  const onSubmit = (data: RegistrationRequest) => {
    const newFormData = { ...formData };
    newFormData.photoKtp = data.fileKtp || {
      originalName: '',
      url: '',
      s3Key: '',
    };
    newFormData.fileKtpDirector = data.fileKtpDirector || {
      originalName: '',
      url: '',
      s3Key: '',
    };
    newFormData.fileNpwp = data.fileNpwp || {
      originalName: '',
      url: '',
      s3Key: '',
    };
    newFormData.fileTdp = data.fileTdp || {
      originalName: '',
      url: '',
      s3Key: '',
    };
    newFormData.fileSiup = data.fileSiup || {
      originalName: '',
      url: '',
      s3Key: '',
    };
    newFormData.fileSppkp = data.fileSppkp || {
      originalName: '',
      url: '',
      s3Key: '',
    };
    newFormData.fileSignature = data.fileSignature || {
      originalName: '',
      url: '',
      s3Key: '',
    };
    formData.dob = formData.dob
      ? moment(formData.dob).format('yyyy-MM-DD')
      : '';
    dispatch(
      actions.signUp(
        {
          formRequest: newFormData,
          navigate,
        },
        () => {
          setPage('OTP');
        },
        message => Notifier.addNotifyError({ message }),
      ),
    );
  };

  const [formData, setFormData] = React.useState({
    fullName: '',
    phone: '',
    email: '',
    password: '',
    nik: '',
    dob: '',
    companyName: '',
    companyAddress: '',
    companyEmail: '',
    companyPhoneNumber: '',
    sppkpNumber: '',
    npwpNumber: '',
    photoKtp: {
      originalName: '',
      url: '',
      s3Key: '',
    },
    fileKtpDirector: {
      originalName: '',
      url: '',
      s3Key: '',
    },
    fileNpwp: {
      originalName: '',
      url: '',
      s3Key: '',
    },
    fileTdp: {
      originalName: '',
      url: '',
      s3Key: '',
    },
    fileSiup: {
      originalName: '',
      url: '',
      s3Key: '',
    },
    fileSppkp: {
      originalName: '',
      url: '',
      s3Key: '',
    },
    fileSignature: {
      originalName: '',
      url: '',
      s3Key: '',
    },
  });

  const renderStepper = (indexItem: number) => {
    if (indexItem === 0) {
      return (
        <PicData
          images={images}
          setImages={setImages}
          handleNext={handleNext}
          handleData={handleData}
          formData={formData}
          setFormData={setFormData}
        />
      );
    } else if (indexItem === 1) {
      return (
        <CompanyInfomation
          handleNext={handleNext}
          handleData={handleData}
          formData={formData}
          setFormData={setFormData}
        />
      );
    } else {
      return <DocumentQualification images={images} setImages={setImages} />;
    }
  };

  const handleData = (data: RegistrationRequest) => {
    if (data.fullName) {
      methods.setValue('fullName', data.fullName);
    }
    if (data.email) {
      methods.setValue('email', data.email);
    }
    if (data.phone) {
      methods.setValue('phone', data.phone);
    }
    if (data.password) {
      methods.setValue('password', data.password);
    }
    if (data.companyName) {
      methods.setValue('companyName', data.companyName);
    }
    if (data.companyEmail) {
      methods.setValue('companyEmail', data.companyEmail);
    }
    if (data.companyAddress) {
      methods.setValue('companyAddress', data.companyAddress);
    }
  };

  const handleNext = async () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    setActiveStep(activeStep + 1);
    setCurrentActiveStep(activeStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = (index: number) => {
    if (index < currentActiveStep) {
      setActiveStep(index);
    } else {
      setActiveStep(currentActiveStep);
    }
  };

  return (
    <div>
      <Grid
        container
        sx={{ height: '100vh' }}
        className={classNames('flex w-full h-full', {
          '!hidden': page === 'OTP',
        })}
      >
        <Grid item md={4} sm={4}>
          <Box
            sx={{
              height: '100%',
              background: '#F2FAFD',
              textAlign: 'center',
              pt: 5,
            }}
          >
            <Box sx={{ pading: '0 20px' }}>
              <Typography
                sx={{
                  fontStyle: 'italic',
                  color: '#005FC5',
                  fontWeight: '700',
                  fontSize: '24px',
                  padding: '1rem',
                }}
              >
                Manage customer and sales process easily and transparently
              </Typography>
            </Box>
            <img
              src={iconDeveloper}
              alt=""
              style={{ margin: '1rem auto 0 auto' }}
            />
          </Box>
        </Grid>
        <Grid item md={8} sm={8}>
          <RootStyle>
            <Box sx={{ width: '100%' }}>
              <Stepper
                activeStep={activeStep}
                sx={{ position: 'fixed', width: '66.66%', zIndex: 999 }}
              >
                {steps.map((label, index) => {
                  const stepProps: { completed?: boolean } = {};
                  const labelProps: {
                    optional?: React.ReactNode;
                  } = {};
                  if (isStepSkipped(index)) {
                    stepProps.completed = false;
                  }
                  return (
                    <Step
                      key={label}
                      {...stepProps}
                      sx={{
                        background: index < activeStep ? '#0DB1F5' : '#FFFFFF',
                        padding: '0px',
                        width: '33.33%',
                      }}
                      onClick={
                        index <= currentActiveStep
                          ? () => handleBack(index)
                          : () => undefined
                      }
                    >
                      <Box
                        sx={{
                          background:
                            index <= activeStep
                              ? 'linear-gradient(93.55deg, #0DB1F5 0.46%, #026BED 99.97%)'
                              : '#FFFFFF',
                          borderRadius: '0 16px 16px 0',
                          padding: '10px',
                          fontWeight: '600',
                          textAlign: 'center',
                          '&:hover': {
                            cursor: 'pointer',
                          },
                        }}
                      >
                        <TextActive>
                          <StepLabel {...labelProps}>{label}</StepLabel>
                        </TextActive>
                      </Box>
                    </Step>
                  );
                })}
              </Stepper>
              {activeStep === steps.length ? (
                <React.Fragment>
                  <Typography sx={{ mt: 2, mb: 1 }}>
                    All steps completed - you&apos;re finished
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Box sx={{ flex: '1 1 auto' }} />
                    <Button onClick={handleReset}>Reset</Button>
                  </Box>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Box sx={{ display: 'flex', flexDirection: 'column', pt: 2 }}>
                    <Typography
                      sx={{
                        mt: 5,
                        mb: 1,
                        textAlign: 'center',
                        fontWeight: '700',
                        fontSize: '28px',
                        lineHeight: '42px',
                      }}
                    >
                      Register as Developer
                    </Typography>
                  </Box>
                  <form
                    onSubmit={methods.handleSubmit(onSubmit)}
                    style={{ display: 'flex', justifyContent: 'center' }}
                  >
                    <FormProvider {...methods}>
                      {renderStepper(activeStep)}
                    </FormProvider>
                  </form>
                  <Stack sx={{ mt: 1 }}>
                    <Typography
                      sx={{
                        marginTop: '1rem',
                        textAlign: 'center',
                        fontWeight: '400',
                        fontSize: '16px',
                        lineHeight: '24px',
                        color: '#223250',
                      }}
                    >
                      Already have an account ?{' '}
                      <Link
                        href={path.login}
                        underline="none"
                        color="#005FC5!important"
                      >
                        Sign In
                      </Link>
                    </Typography>
                  </Stack>
                </React.Fragment>
              )}
            </Box>
          </RootStyle>
        </Grid>
      </Grid>
      {page === 'OTP' && (
        <Otp
          username={methods.getValues().email || formData.email}
          password={methods.getValues().password || formData.password}
        />
      )}
    </div>
  );
};

export default DeveloperPage;

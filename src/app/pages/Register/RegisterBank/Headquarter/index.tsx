import Stepper1 from 'app/components/Stepper/Stepper1';
import { useAuthSlice } from 'app/pages/Login/slice';
import Notifier from 'app/pages/Notifier';
import path from 'app/routes/path';
import classNames from 'classnames';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Otp from '../../Components/Otp';
import { useSignUpCreateSlice } from '../../slice';
import { FileProps, SignUpHeadquarterData } from '../../slice/types';
import CompanyInformation from './components/CompanyInformation';
import DocumentQualification from './components/DocumentQualification';
import PicData from './components/PicData';
import bankImg from 'assets/register/bank.png';

const RootContainer = styled.div`
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`;

const LeftContainer = styled.div`
  display: flex;
  background: #f2fafd;
  width: 30%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
`;

const RightContainer = styled.div`
  display: flex;
  flex-grow: 1;
  height: 100%;
  min-height: 700px;
  overflow-y: auto;
  overflow-x: hidden;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const Title = styled.h1`
  font-weight: 700;
  font-size: 28px;
  line-height: 42px;
  margin-top: 70px;
  margin-bottom: 44px;
`;

export const registerRef = React.createRef<HTMLDivElement>();

export default function RegisterHeadquarterBank() {
  const [page, setPage] = useState<'OTP' | 'SIGN_UP'>('SIGN_UP');
  const [steps, setSteps] = useState([
    { label: '1. PIC Data', complete: false, active: true },
    { label: '2. Company Information', complete: false, active: false },
    { label: '3. Document Qualification', complete: false, active: false },
  ]);

  const dispatch = useDispatch();
  const { actions: signUpActions } = useSignUpCreateSlice();
  const { actions: loginActions } = useAuthSlice();

  const pic1Methods = useForm({ reValidateMode: 'onChange', mode: 'onChange' });
  const pic2Methods = useForm({
    reValidateMode: 'onChange',
    mode: 'onChange',
  });
  const companyInformation1Methods = useForm({
    reValidateMode: 'onChange',
    mode: 'onChange',
  });
  const companyInformation2Methods = useForm({
    reValidateMode: 'onChange',
    mode: 'onChange',
  });

  const ktpMethods = useForm({ reValidateMode: 'onChange', mode: 'onChange' });
  const npwpMethods = useForm({ reValidateMode: 'onChange', mode: 'onChange' });
  const tdpMethods = useForm({ reValidateMode: 'onChange', mode: 'onChange' });
  const siupMethods = useForm({ reValidateMode: 'onChange', mode: 'onChange' });
  const sppkpMethods = useForm({
    reValidateMode: 'onChange',
    mode: 'onChange',
  });

  useEffect(() => {
    if (page === 'OTP')
      dispatch(
        loginActions.login({
          username: pic1Methods.getValues().email,
          password: pic1Methods.getValues().password,
        }),
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleContinue = (stepIndex: number, isLast?: boolean) => {
    if (isLast)
      setSteps(prev => {
        prev[stepIndex].complete = true;
        prev[stepIndex].active = false;
        prev[stepIndex + 1].active = true;
        return [...prev];
      });
  };

  const handleSubmit = () => {
    setSteps(prev => {
      prev[2].complete = true;
      return [...prev];
    });

    const getFile = (fileObject: FileProps & { file?: File }) => {
      return { ...fileObject, file: undefined };
    };

    const signUpData: SignUpHeadquarterData = {
      email: pic1Methods.getValues().email,
      password: pic1Methods.getValues().password,
      kyc: {
        fullName: pic1Methods.getValues().fullName,
        phone: pic1Methods.getValues().phone,
        email: pic1Methods.getValues().email,
        dob: moment(pic2Methods.getValues().dob).format('yyyy-MM-DD'),
        nik: pic2Methods.getValues().nik,
        filePhoto: getFile(pic2Methods.getValues().idPhoto),
        fileSignature: getFile(sppkpMethods.getValues().signature),
      },
      company: {
        email: companyInformation1Methods.getValues().companyEmail,
        name: companyInformation1Methods.getValues().companyName,
        address: companyInformation1Methods.getValues().address,
        phone: companyInformation2Methods.getValues().phone,
        sppkpNumber: companyInformation2Methods.getValues().sppkp,
        npwpNumber: companyInformation2Methods.getValues().npwp,
        fileLogo: pic2Methods.getValues().fileLogo,
      },
      documentQualification: {
        fileKtpDirector: [getFile(ktpMethods.getValues().ktp)],
        fileNpwp: [getFile(npwpMethods.getValues().npwp)],
        fileTdp: [getFile(tdpMethods.getValues().tdp)],
        fileSiup: [getFile(siupMethods.getValues().siup)],
        fileSppkp: [getFile(sppkpMethods.getValues().sppkp)],
      },
      bankAccountType: 'HEAD_QUARTER',
    };
    dispatch(
      signUpActions.signUpHeadquarter(
        signUpData,
        () => {
          setPage('OTP');
        },
        message => Notifier.addNotifyError({ message }),
      ),
    );
  };

  const handleChangeStep = (nextStep: number) => {
    const currentStep = steps.findIndex(item => item.active);
    const isValidStep1 =
      pic1Methods.formState.isValid && pic2Methods.formState.isValid;
    const isValidStep2 =
      pic1Methods.formState.isValid && pic2Methods.formState.isValid;

    const isValidStep3 =
      ktpMethods.formState.isValid &&
      npwpMethods.formState.isValid &&
      tdpMethods.formState.isValid &&
      siupMethods.formState.isValid &&
      sppkpMethods.formState.isValid;

    switch (currentStep) {
      case 0:
        if (!isValidStep1) return;
        setSteps(prev => {
          prev[currentStep].active = false;
          prev[currentStep].complete = true;
          prev[nextStep].active = true;
          return [...prev];
        });
        break;
      case 1:
        if (!isValidStep2 && isValidStep3 && isValidStep1) return;
        setSteps(prev => {
          prev[currentStep].active = false;
          prev[currentStep].complete = isValidStep2;
          prev[nextStep].active = true;
          return [...prev];
        });
        break;

      case 2:
        setSteps(prev => {
          prev[currentStep].active = false;
          prev[currentStep].complete = isValidStep3;
          prev[nextStep].active = true;
          return [...prev];
        });
        break;
    }
  };
  return (
    <RootContainer>
      <div
        className={classNames('flex w-full h-full', {
          '!hidden': page === 'OTP',
        })}
      >
        <LeftContainer>
          <h1 className="text-[24px] leading-9 font-bold italic text-[#005FC5] text-center mt-[60px]">
            Manage mortgage requests more easily and transparently
          </h1>
          <img src={bankImg} alt="" className="w-[70%] object-contain" />
        </LeftContainer>
        <RightContainer ref={registerRef}>
          <Stepper1 steps={steps} onChangeStep={handleChangeStep} />

          <Title>Register as Bank</Title>
          <div className="w-[600px]">
            <PicData
              show={steps[0].active}
              pic1FormMethods={pic1Methods}
              pic2FormMethods={pic2Methods}
              onSubmitPic1={() => handleContinue(0)}
              onSubmitPic2={() => handleContinue(0, true)}
            />
            <CompanyInformation
              show={steps[1].active}
              step1FormMethods={companyInformation1Methods}
              step2FormMethods={companyInformation2Methods}
              onSubmitStep1={() => handleContinue(1)}
              onSubmitStep2={() => handleContinue(1, true)}
            />
            <DocumentQualification
              show={steps[2].active}
              formMethods1={ktpMethods}
              formMethods2={npwpMethods}
              formMethods3={tdpMethods}
              formMethods4={siupMethods}
              formMethods5={sppkpMethods}
              onSubmit1={() => handleContinue(2)}
              onSubmit2={() => handleContinue(2)}
              onSubmit3={() => handleContinue(2)}
              onSubmit4={() => handleContinue(2)}
              onSubmit5={handleSubmit}
            />
            <div className="w-full flex justify-center mb-10">
              <p>
                Already have an account?{' '}
                <Link to={path.login}>
                  <span className="text-[#005FC5]">Sign In</span>
                </Link>
              </p>
            </div>
          </div>
        </RightContainer>
      </div>
      {page === 'OTP' && (
        <Otp
          username={pic1Methods.getValues().email}
          password={pic1Methods.getValues().password}
        />
      )}
    </RootContainer>
  );
}

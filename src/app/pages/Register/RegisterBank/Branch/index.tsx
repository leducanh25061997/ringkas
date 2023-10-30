import Stepper1 from 'app/components/Stepper/Stepper1';
import { useAuthSlice } from 'app/pages/Login/slice';
import Notifier from 'app/pages/Notifier';
import classNames from 'classnames';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import Otp from '../../Components/Otp';
import { useSignUpCreateSlice } from '../../slice';
import { FileProps, signUpBranchData } from '../../slice/types';
import AccountInformation from './components/AccountInformation';
import BranchInformation from './components/BranchInformation';

import bankImg from 'assets/register/bank.png';
import { Link } from 'react-router-dom';
import path from 'app/routes/path';

const RootContainer = styled.div`
  height: 100vh;
  width: 100vw;
`;

const LeftContainer = styled.div`
  display: flex;
  background: #f2fafd;
  width: 30%;
  height: 100%;
  flex-shrink: 0;
  flex-direction: column;
  align-items: center;
`;

const RightContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  min-height: 700px;
  overflow-y: auto;
  flex-direction: column;
`;

const Title = styled.h1`
  font-weight: 700;
  font-size: 28px;
  line-height: 42px;
  margin-top: 70px;
  margin-bottom: 40px;
`;

export const branchRegisterRef = React.createRef<HTMLDivElement>();

export default function RegisterHeadquarterBank() {
  const [page, setPage] = useState<'OTP' | 'SIGN_UP'>('SIGN_UP');
  const [steps, setSteps] = useState([
    { label: '1. Account Information', complete: false, active: true },
    { label: '2. Branch Information', complete: false, active: false },
  ]);

  const dispatch = useDispatch();
  const { actions: signUpActions } = useSignUpCreateSlice();
  const { actions: loginActions } = useAuthSlice();

  const step1Methods = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });
  const step2Methods = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  useEffect(() => {
    if (page === 'OTP')
      dispatch(
        loginActions.login({
          username: step1Methods.getValues().email,
          password: step1Methods.getValues().password,
        }),
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleChangeStep = (nextStep: number) => {
    const currentStep = steps.findIndex(item => item.active);

    switch (currentStep) {
      case 0:
        if (!step1Methods.formState.isValid) return;
        setSteps(prev => {
          prev[0].active = false;
          prev[0].complete = true;
          prev[1].active = true;
          return [...prev];
        });
        break;
      case 1:
        if (!step2Methods.formState.isValid && currentStep < nextStep) return;
        setSteps(prev => {
          prev[1].active = false;
          prev[1].complete = step2Methods.formState.isValid;
          prev[nextStep].active = true;
          return [...prev];
        });
        break;

      default:
        break;
    }
  };

  const handleSubmitStep1 = () => {
    setSteps(prev => {
      prev[0].active = false;
      prev[0].complete = true;
      prev[1].active = true;
      return [...prev];
    });
  };

  const handleSubmitStep2 = () => {
    setSteps(prev => {
      prev[1].complete = true;
      return [...prev];
    });

    const getFile = (fileObject: FileProps & { file?: File }) => {
      return { ...fileObject, file: undefined };
    };

    const step1Values = step1Methods.getValues();
    const step2Values = step2Methods.getValues();
    const data: signUpBranchData = {
      email: step1Values.email,
      password: step1Values.password,
      kyc: {
        fullName: step1Values.fullName,
        phone: step1Values.phone,
        email: step1Values.email,
        dob: moment(step1Values.dob).format('yyyy-MM-DD'),
        nik: step1Values.nik,
        fileNik: getFile(step1Values.ktp),
        fileSignature: getFile(step2Values.signature),
        birthPlace: step1Values.placeOfBirth,
      },
      company: {
        email: step2Values.email,
        name: step2Values.hqCompanyName,
        address: step2Values.branchAddress,
        branchName: step2Values.branchName,
        titleBranch: step1Values.title,
        parentAccountUserUuid: step1Values.headquarter.value,
        nip: step1Values.nip,
        province: step2Values.province.value,

        city: step2Values.city.value,
        phone: step2Values.phone,
      },

      bankAccountType: 'BRANCH',
    };
    dispatch(
      signUpActions.signUpBranch(
        data,
        () => {
          setPage('OTP');
        },
        message => Notifier.addNotifyError({ message }),
      ),
    );
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
        <RightContainer ref={branchRegisterRef}>
          <Stepper1 steps={steps} onChangeStep={handleChangeStep} width={700} />
          <div className="w-[600px] mx-auto flex items-center flex-col">
            <Title>Register as Bank</Title>
          </div>
          <div className="w-[600px] mx-auto">
            <AccountInformation
              methods={step1Methods}
              onSubmit={handleSubmitStep1}
              show={steps[0].active}
            />
            <BranchInformation
              methods={step2Methods}
              onSubmit={handleSubmitStep2}
              show={steps[1].active}
            />
          </div>
          <div className="w-full flex justify-center mb-10">
            <p>
              Already have an account?{' '}
              <Link to={path.login}>
                <span className="text-[#005FC5]">Sign In</span>
              </Link>
            </p>
          </div>
        </RightContainer>
      </div>

      {page === 'OTP' && (
        <Otp
          // onBack={() => setPage('SIGN_UP')}
          username={step1Methods.getValues().email}
          password={step1Methods.getValues().password}
        />
      )}
    </RootContainer>
  );
}

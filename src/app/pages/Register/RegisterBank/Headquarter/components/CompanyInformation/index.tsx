import Stepper2 from 'app/components/Stepper/Stepper2';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import styled from 'styled-components';
import { registerRef } from '../..';
import CompanyInformation1 from './CompanyInformation1';
import CompanyInformation2 from './CompanyInformation2';

const RootContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

interface Props {
  step1FormMethods: UseFormReturn<FieldValues>;
  onSubmitStep1: () => void;
  step2FormMethods: UseFormReturn<FieldValues>;
  onSubmitStep2: () => void;
  show: boolean;
}

export default function CompanyInformation(props: Props) {
  const {
    step1FormMethods,
    step2FormMethods,
    onSubmitStep1,
    onSubmitStep2,
    show,
  } = props;
  const [steps, setSteps] = useState([
    { label: 'Company Information 1', complete: false, active: true },
    { label: 'Company Information 2', complete: false, active: false },
  ]);

  useEffect(() => {
    if (show) {
      registerRef.current?.scrollTo({ top: 0 });
      setSteps(prev => {
        prev[0].active = true;
        return [...prev];
      });
    }
  }, [show]);

  const handleSubmitStep1 = () => {
    setSteps(prev => {
      prev[0].active = false;
      prev[0].complete = true;
      prev[1].active = true;
      return [...prev];
    });
    onSubmitStep1();
  };

  const handleSubmitStep2 = () => {
    setSteps(prev => {
      prev[1].active = false;
      prev[1].complete = true;
      return [...prev];
    });
    onSubmitStep2();
  };

  const handleChangeStep = (nextStep: number) => {
    const currentStep = steps.findIndex(item => item.active);
    switch (currentStep) {
      case 0:
        if (!step1FormMethods.formState.isValid) return;
        setSteps(prev => {
          prev[currentStep].active = false;
          prev[currentStep].complete = step1FormMethods.formState.isValid;
          prev[nextStep].active = true;
          return [...prev];
        });
        break;
      default:
        setSteps(prev => {
          prev[currentStep].active = false;
          prev[currentStep].complete = step2FormMethods.formState.isValid;
          prev[nextStep].active = true;
          return [...prev];
        });
        break;
    }
  };

  return (
    <RootContainer className={classNames({ '!hidden': !show })}>
      <Stepper2 steps={steps} onChangeStep={handleChangeStep} />

      <CompanyInformation1
        formMethods={step1FormMethods}
        onSubmit={handleSubmitStep1}
        show={steps[0].active}
      />
      <CompanyInformation2
        show={steps[1].active}
        formMethods={step2FormMethods}
        onSubmit={handleSubmitStep2}
      />
    </RootContainer>
  );
}

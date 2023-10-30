import Stepper2 from 'app/components/Stepper/Stepper2';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import styled from 'styled-components';
import { registerRef } from '../..';
import Ktp from './Ktp';
import Npwp from './Npwp';
import Siup from './Siup';
import Sppkp from './Sppkp';
import Tdp from './Tdp';

const RootContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

interface Props {
  formMethods1: UseFormReturn<FieldValues>;
  onSubmit1: () => void;
  formMethods2: UseFormReturn<FieldValues>;
  onSubmit2: () => void;
  formMethods3: UseFormReturn<FieldValues>;
  onSubmit3: () => void;
  formMethods4: UseFormReturn<FieldValues>;
  onSubmit4: () => void;
  formMethods5: UseFormReturn<FieldValues>;
  onSubmit5: () => void;
  show: boolean;
}

export default function DocumentQualification(props: Props) {
  const {
    show,
    formMethods1,
    onSubmit1,
    formMethods2,
    onSubmit2,
    onSubmit3,
    formMethods3,
    onSubmit4,
    formMethods4,
    onSubmit5,
    formMethods5,
  } = props;
  const [steps, setSteps] = useState([
    { label: 'KTP', complete: false, active: true },
    { label: 'NPWP', complete: false, active: false },
    { label: 'TDP', complete: false, active: false },
    { label: 'SIUP', complete: false, active: false },
    { label: 'SPPKP', complete: false, active: false },
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
    onSubmit1();
  };

  const handleSubmitStep2 = () => {
    setSteps(prev => {
      prev[1].active = false;
      prev[1].complete = true;
      prev[2].active = true;
      return [...prev];
    });
    onSubmit2();
  };

  const handleSubmitStep3 = () => {
    setSteps(prev => {
      prev[2].active = false;
      prev[2].complete = true;
      prev[3].active = true;
      return [...prev];
    });
    onSubmit3();
  };

  const handleSubmitStep4 = () => {
    setSteps(prev => {
      prev[3].active = false;
      prev[3].complete = true;
      prev[4].active = true;
      return [...prev];
    });
    onSubmit4();
  };

  const handleSubmitStep5 = () => {
    setSteps(prev => {
      // prev[0].active = false;
      prev[4].complete = true;
      // prev[1].active = true;
      return [...prev];
    });
    onSubmit5();
  };

  const handleChangeStep = (nextStep: number) => {
    const currentStep = steps.findIndex(item => item.active);
    switch (currentStep) {
      case 0:
        if (!formMethods1.formState.isValid) return;

        setSteps(prev => {
          prev[currentStep].active = false;
          prev[currentStep].complete = true;
          prev[nextStep].active = true;
          return [...prev];
        });
        break;
      case 1:
        if (
          !formMethods2.formState.isValid &&
          formMethods3.formState.isValid &&
          formMethods1.formState.isValid
        )
          return;
        setSteps(prev => {
          prev[currentStep].active = false;
          prev[currentStep].complete = formMethods2.formState.isValid;
          prev[nextStep].active = true;
          return [...prev];
        });
        break;
      case 2:
        if (
          !formMethods3.formState.isValid &&
          formMethods4.formState.isValid &&
          formMethods2.formState.isValid
        )
          return;
        setSteps(prev => {
          prev[currentStep].active = false;
          prev[currentStep].complete = formMethods3.formState.isValid;
          prev[nextStep].active = true;
          return [...prev];
        });
        break;
      case 3:
        if (
          !formMethods4.formState.isValid &&
          formMethods5.formState.isValid &&
          formMethods3.formState.isValid
        )
          return;
        setSteps(prev => {
          prev[currentStep].active = false;
          prev[currentStep].complete = formMethods4.formState.isValid;
          prev[nextStep].active = true;
          return [...prev];
        });
        break;
      case 4:
        setSteps(prev => {
          prev[currentStep].active = false;
          prev[currentStep].complete = formMethods5.formState.isValid;
          prev[nextStep].active = true;
          return [...prev];
        });
        break;
    }
  };

  return (
    <RootContainer className={classNames({ '!hidden': !show })}>
      <Stepper2 steps={steps} onChangeStep={handleChangeStep} />

      <Ktp
        formMethods={formMethods1}
        onSubmit={handleSubmitStep1}
        show={steps[0].active}
      />
      <Npwp
        formMethods={formMethods2}
        onSubmit={handleSubmitStep2}
        show={steps[1].active}
      />
      <Tdp
        formMethods={formMethods3}
        onSubmit={handleSubmitStep3}
        show={steps[2].active}
      />
      <Siup
        formMethods={formMethods4}
        onSubmit={handleSubmitStep4}
        show={steps[3].active}
      />
      <Sppkp
        formMethods={formMethods5}
        onSubmit={handleSubmitStep5}
        show={steps[4].active}
      />
    </RootContainer>
  );
}

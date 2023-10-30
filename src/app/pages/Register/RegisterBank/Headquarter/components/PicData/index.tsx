import Stepper2 from 'app/components/Stepper/Stepper2';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import styled from 'styled-components';
import { registerRef } from '../..';
import PicData1 from './PicData1';
import PicData2 from './PicData2';

const RootContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

interface Props {
  pic1FormMethods: UseFormReturn<FieldValues>;
  onSubmitPic1: () => void;
  pic2FormMethods: UseFormReturn<FieldValues>;
  onSubmitPic2: () => void;
  show: boolean;
}

export default function Step1(props: Props) {
  const { pic1FormMethods, pic2FormMethods, onSubmitPic1, onSubmitPic2, show } =
    props;
  const [steps, setSteps] = useState([
    { label: 'PIC Data 1', complete: false, active: true },
    { label: 'PIC Data 2', complete: false, active: false },
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

  const handleSubmitPic1 = () => {
    setSteps(prev => {
      prev[0].active = false;
      prev[0].complete = true;
      prev[1].active = true;
      return [...prev];
    });
    onSubmitPic1();
  };

  const handleSubmitPic2 = () => {
    setSteps(prev => {
      prev[1].active = false;
      prev[1].complete = true;
      return [...prev];
    });
    onSubmitPic2();
  };

  const handleChangeStep = (nextStep: number) => {
    const currentStep = steps.findIndex(item => item.active);

    switch (currentStep) {
      case 0:
        if (!pic1FormMethods.formState.isValid) return;
        setSteps(prev => {
          prev[currentStep].active = false;
          prev[currentStep].complete = pic1FormMethods.formState.isValid;
          prev[nextStep].active = true;
          return [...prev];
        });
        break;
      default:
        setSteps(prev => {
          prev[currentStep].active = false;
          prev[currentStep].complete = pic2FormMethods.formState.isValid;
          prev[nextStep].active = true;
          return [...prev];
        });
        break;
    }
  };

  return (
    <RootContainer className={classNames({ '!hidden': !show })}>
      <Stepper2
        steps={steps}
        onChangeStep={handleChangeStep}
        className={classNames({ hidden: !show })}
      />

      <PicData1
        formMethods={pic1FormMethods}
        onSubmit={handleSubmitPic1}
        show={steps[0].active}
      />
      <PicData2
        formMethods={pic2FormMethods}
        onSubmit={handleSubmitPic2}
        show={steps[1].active}
      />
    </RootContainer>
  );
}

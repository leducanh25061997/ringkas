import { Checkbox } from '@mui/material';
import { ControlledImageUpload } from 'app/components/ImageUpload';
import { ControlledSignature } from 'app/components/Signature/Signature1';
import classNames from 'classnames';
import React, { useEffect } from 'react';
import { Controller, FieldValues, UseFormReturn } from 'react-hook-form';
import styled from 'styled-components';
import { registerRef } from '../..';
import SubmitButton from '../SubmitButton';

const Form = styled.form`
  &.hidden {
    display: none;
  }
  width: 100%;
  margin-top: 48px;
  display: flex;
  flex-direction: column;
  .field {
    margin-top: 16px;
    &:first-child {
      margin-top: 0;
    }
  }
  .continue-btn {
    margin-top: 80px;
    margin-bottom: 32px;
  }
`;

interface Props {
  formMethods: UseFormReturn<FieldValues>;
  onSubmit: () => void;
  show: boolean;
}
export default function Sppkp({ formMethods, onSubmit, show }: Props) {
  const {
    handleSubmit,
    control,
    formState: { isValid },
  } = formMethods;

  useEffect(() => {
    if (show) {
      registerRef.current?.scrollTo({ top: 0 });
    }
  }, [show]);

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      className={classNames({ '!hidden': !show })}
    >
      <ControlledImageUpload
        className="field"
        label="Upload SPPKP"
        name="sppkp"
        control={control}
        rules={{
          required: 'Required',
        }}
      />
      <Controller
        control={control}
        name="checkbox"
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <div className="flex w-full field items-start">
            <Checkbox
              onChange={e => {
                onChange(e.target.checked);
              }}
              checked={value || false}
              sx={{ padding: '3px' }}
            />
            <p className="text-[#9098A7] text-[14px] leading-[21px] ml-[19px]">
              I give permission to concise to check the data in dukcapil and
              SLIK
            </p>
          </div>
        )}
      />
      <ControlledSignature
        name="signature"
        className="field"
        rules={{ required: 'Required' }}
        control={control}
      />

      <SubmitButton type="submit" className="continue-btn" disabled={!isValid}>
        Submit
      </SubmitButton>
    </Form>
  );
}

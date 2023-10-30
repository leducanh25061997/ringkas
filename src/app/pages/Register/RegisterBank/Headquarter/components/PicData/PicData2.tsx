import { ControlledTextField } from 'app/components/CustomTextField';
import { ControlledDatePicker } from 'app/components/DatePicker';
import { ControlledImageUpload } from 'app/components/ImageUpload';
import classNames from 'classnames';
import React, { useEffect } from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';
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
  onSubmit: (values: FieldValues) => void;
  show: boolean;
}
export default function PicData2({ formMethods, onSubmit, show }: Props) {
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
      <ControlledTextField
        className="field"
        type="id"
        label="NIK"
        name="nik"
        required
        control={control}
        rules={{
          required: 'Required',
        }}
      />

      <ControlledDatePicker
        control={control}
        name="dob"
        label="Date of birth*"
        className="field"
        disableFuture
        rules={{
          required: 'Required',
        }}
      />

      <ControlledImageUpload
        name="idPhoto"
        control={control}
        label="Photo ID"
        className="field"
        rules={{
          required: 'Required',
        }}
      />

      <ControlledImageUpload
        name="fileLogo"
        control={control}
        label="Bank Logo"
        className="field"
        rules={{
          required: 'Required',
        }}
      />

      <SubmitButton type="submit" className="continue-btn" disabled={!isValid}>
        Continue
      </SubmitButton>
    </Form>
  );
}

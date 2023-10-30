import { ControlledTextField } from 'app/components/CustomTextField';
import classNames from 'classnames';
import React, { useEffect } from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import styled from 'styled-components';
import { PHONE_NUMBER } from 'utils/helpers/regex';
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
export default function CompanyInformation2({
  formMethods,
  onSubmit,
  show,
}: Props) {
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
        type="tel"
        label="Company Phone Number"
        name="phone"
        required
        control={control}
        rules={{
          required: 'Required',
          pattern: {
            value: PHONE_NUMBER,
            message: 'Invalid phone number',
          },
        }}
      />
      <ControlledTextField
        className="field"
        type="id"
        label="Company SPPKP Number"
        name="sppkp"
        required
        control={control}
        rules={{
          required: 'Required',
        }}
      />
      <ControlledTextField
        className="field"
        type="id"
        label=" Company NPWP Number"
        name="npwp"
        required
        control={control}
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

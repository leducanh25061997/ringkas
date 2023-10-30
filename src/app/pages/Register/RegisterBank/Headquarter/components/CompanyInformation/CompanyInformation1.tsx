import { ControlledTextField } from 'app/components/CustomTextField';
import { ControlledTextarea } from 'app/components/TextArea';
import classNames from 'classnames';
import React, { useEffect } from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import styled from 'styled-components';
import { EMAIL_REGEX } from 'utils/helpers/regex';
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
export default function CompanyInformation1({
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
        label="Company name"
        name="companyName"
        required
        control={control}
        rules={{
          required: 'Required',
        }}
      />

      <ControlledTextField
        className="field"
        label="Email"
        name="companyEmail"
        required
        control={control}
        rules={{
          required: 'Required',
          pattern: {
            value: EMAIL_REGEX,
            message: 'Incorrect format email',
          },
        }}
      />
      <ControlledTextarea
        className="field"
        label="Company Address"
        name="address"
        control={control}
        rules={{
          required: 'Required',
        }}
        required
      />

      <SubmitButton type="submit" className="continue-btn" disabled={!isValid}>
        Continue
      </SubmitButton>
    </Form>
  );
}

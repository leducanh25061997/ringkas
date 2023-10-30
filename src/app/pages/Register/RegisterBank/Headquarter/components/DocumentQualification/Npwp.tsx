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
  onSubmit: () => void;
  show: boolean;
}
export default function Npwp({ formMethods, onSubmit, show }: Props) {
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
        label="NPWP"
        name="npwp"
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

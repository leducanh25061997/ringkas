import { ControlledTextField } from 'app/components/CustomTextField';
import classNames from 'classnames';
import { useEffect } from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import styled from 'styled-components';
import { EMAIL_REGEX, PASSWORD_REGEX, PHONE_NUMBER } from 'utils/helpers/regex';
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
export default function PicData1({ formMethods, onSubmit, show }: Props) {
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
        label="Full name"
        name="fullName"
        required
        control={control}
        rules={{
          required: 'Required',
        }}
      />
      <ControlledTextField
        className="field"
        label="Phone number"
        name="phone"
        type="tel"
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
        label="Email"
        name="email"
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
      <ControlledTextField
        className="field"
        label="Password"
        name="password"
        type="password"
        id="password"
        required
        control={control}
        rules={{
          required: 'Required',
          minLength: {
            value: 8,
            message: 'Min 8 chars',
          },
          pattern: {
            value: PASSWORD_REGEX,
            message:
              'Consist combination of alphanumeric, symbol, lowercase and uppercase',
          },
        }}
      />

      <SubmitButton type="submit" className="continue-btn" disabled={!isValid}>
        Continue
      </SubmitButton>
    </Form>
  );
}

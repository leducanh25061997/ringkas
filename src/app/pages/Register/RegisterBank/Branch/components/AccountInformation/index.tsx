import { ControlledTextField } from 'app/components/CustomTextField';
import { ControlledDatePicker } from 'app/components/DatePicker';
import { ControlledHeadquarterDropdown } from 'app/components/DropdownInput/Headquarter';
import { ControlledImageUpload } from 'app/components/ImageUpload';
import classNames from 'classnames';
import React, { useEffect } from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import styled from 'styled-components';
import { EMAIL_REGEX, PASSWORD_REGEX, PHONE_NUMBER } from 'utils/helpers/regex';
import { branchRegisterRef } from '../..';
import SubmitButton from '../../../Headquarter/components/SubmitButton';

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
  methods: UseFormReturn<FieldValues>;
  onSubmit: () => void;
  show: boolean;
}

export default function AccountInformation(props: Props) {
  const {
    methods: {
      control,
      handleSubmit,
      formState: { isValid },
    },
    onSubmit,
    show,
  } = props;

  useEffect(() => {
    if (show) branchRegisterRef.current?.scrollTo({ top: 0 });
  }, [show]);

  return (
    <Form
      className={classNames({ hidden: !show })}
      onSubmit={handleSubmit(onSubmit)}
    >
      <ControlledHeadquarterDropdown
        name="headquarter"
        control={control}
        label="Select Headquarter"
        className="w-full"
        rules={{
          required: 'Required',
        }}
        required
      />
      <ControlledTextField
        className="field w-full"
        label="email"
        name="email"
        control={control}
        required
        rules={{
          required: 'Required',
          pattern: {
            value: EMAIL_REGEX,
            message: 'Incorrect format email',
          },
        }}
      />
      <ControlledTextField
        className="field w-full"
        label="Password"
        name="password"
        type="password"
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
      <ControlledTextField
        className="field w-full"
        label="Full Name As ID"
        name="fullName"
        control={control}
        required
        rules={{
          required: 'Required',
        }}
      />
      <ControlledTextField
        className="field w-full"
        label="Title in Branch"
        name="title"
        control={control}
        required
        rules={{
          required: 'Required',
        }}
      />
      <ControlledTextField
        className="field w-full"
        label="NIP"
        name="nip"
        type="id"
        required
        control={control}
        rules={{
          required: 'Required',
        }}
      />
      <ControlledTextField
        className="field w-full"
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
        className="field w-full"
        label="NIK"
        name="nik"
        type="id"
        control={control}
        required
        rules={{
          required: 'Required',
        }}
      />
      <ControlledDatePicker
        control={control}
        name="dob"
        label="Date of birth*"
        className="field w-full"
        disableFuture
        rules={{
          required: 'Required',
        }}
      />
      <ControlledTextField
        className="field w-full"
        label="Place of Birth"
        name="placeOfBirth"
        control={control}
        required
        rules={{
          required: 'Required',
        }}
      />
      <ControlledImageUpload
        className="field w-full"
        label="Photo of KTP"
        name="ktp"
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

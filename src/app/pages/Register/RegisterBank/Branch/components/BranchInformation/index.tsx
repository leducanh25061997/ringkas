import { Checkbox } from '@mui/material';
import { ControlledTextField } from 'app/components/CustomTextField';
import { ControlledCityDropdown } from 'app/components/DropdownInput/Cities';
import { ControlledProvinceDropdown } from 'app/components/DropdownInput/Provinces';
import { ControlledSignature } from 'app/components/Signature/Signature1';
import { ControlledTextarea } from 'app/components/TextArea';
import classNames from 'classnames';
import React, { useEffect } from 'react';
import { Controller, FieldValues, UseFormReturn } from 'react-hook-form';
import styled from 'styled-components';
import { EMAIL_REGEX, PHONE_NUMBER } from 'utils/helpers/regex';
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
    width: 100%;
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

export default function BranchInformation(props: Props) {
  const {
    methods: {
      setValue,
      handleSubmit,
      watch,
      control,
      formState: { isValid },
    },
    onSubmit,
    show,
  } = props;

  const handleChangeProvince = (value?: { label: string; value: string }) => {
    setValue('city', undefined);
  };

  useEffect(() => {
    if (show) branchRegisterRef.current?.scrollTo({ top: 0 });
  }, [show]);

  return (
    <Form
      className={classNames({ hidden: !show })}
      onSubmit={handleSubmit(onSubmit)}
    >
      <ControlledTextField
        className="field"
        label="HQ Company Name"
        name="hqCompanyName"
        required
        control={control}
        rules={{
          required: 'Required',
        }}
      />
      <ControlledProvinceDropdown
        name="province"
        control={control}
        label="Province"
        className="field"
        placeholder="Select Province"
        onChange={handleChangeProvince}
        rules={{
          required: 'Required',
        }}
      />
      <ControlledCityDropdown
        name="city"
        control={control}
        label="City/Regency"
        className="field"
        placeholder="City/Regency"
        province={watch('province')?.value}
        rules={{
          required: 'Required',
        }}
      />
      <ControlledTextField
        className="field"
        label="Branch Name"
        name="branchName"
        required
        control={control}
        rules={{
          required: 'Required',
        }}
      />
      <ControlledTextarea
        className="field"
        label="Branch Address"
        name="branchAddress"
        control={control}
        rules={{
          required: 'Required',
        }}
        required
      />
      <ControlledTextField
        className="field"
        label="Branch Email"
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
        label="Branch Phone Number"
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
      <Controller
        control={control}
        name="checkbox"
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <div className="flex w-full field items-center">
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

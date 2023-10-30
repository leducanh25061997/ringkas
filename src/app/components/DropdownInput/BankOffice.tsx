import React, { useEffect, useState } from 'react';
import { Control, Controller, RegisterOptions } from 'react-hook-form';
import { axiosClient } from 'services/api/axios';
import { BankLoanForm } from 'types/BankLoanManagement';
import DropDownInput from '.';
import { DropdownItem } from './type';

interface Props {
  className?: string;
  name?: string;
  error?: boolean;
  errorText?: string;
  placeholder?: string;
  value?: DropdownItem;
  onChange?: (newValue?: DropdownItem) => void;
  onBlur?: (currentValue?: DropdownItem) => void;
  label: string;
  type?: string;
  required?: boolean;
  bankUuid?: boolean;
  disabled?: boolean;
}
export default function BankOffices(props: Props) {
  const { bankUuid, disabled, ...rest } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    axiosClient
      .get(`/console/bank/${bankUuid}/loans?size=50&page=0&statusList=ACTIVE`)
      .then(res => {
        setOptions(
          res.data.data.map((item: BankLoanForm) => ({
            label: item.programName,
            value: item.id,
          })),
        );
      })
      .finally(() => setIsLoading(false));
  }, [bankUuid]);

  return (
    <DropDownInput
      options={options}
      isLoading={isLoading}
      {...rest}
      disabled={disabled}
    />
  );
}

type FormValues = Record<string, DropdownItem>;

interface FieldProps extends Props {
  control: Control<FormValues>;
  rules?: RegisterOptions;
  name: string;
}

export const ControlledBankOfficeDropdown = (props: FieldProps & Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {
    control,
    name,
    rules,
    disabled,
    value,
    onChange,
    errorText,
    error,
    ...rest
  } = props;

  return (
    <Controller
      name={name}
      rules={rules}
      control={control}
      render={({ field, fieldState }) => {
        return (
          <BankOffices
            {...rest}
            onBlur={(currentValue?: DropdownItem) => {
              if (!currentValue?.label?.trim()) {
                field.onChange();
                return;
              }
            }}
            error={!!fieldState.error}
            errorText={fieldState.error?.message}
            value={value ? value : field.value}
            onChange={newValue => {
              field.onChange(newValue);
              onChange && onChange(newValue);
            }}
            disabled={disabled}
          />
        );
      }}
    />
  );
};
